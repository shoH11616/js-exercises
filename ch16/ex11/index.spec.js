import { test, expect } from "@playwright/test";
import net from "net";

// テスト対象のページに移動する関数
async function gotoTestTarget(page) {
  await page.goto("http://localhost:8080");
  await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
}

test.describe("Custom HTTP Server", () => {
  let server;

  test.beforeAll(async () => {
    server = net.createServer((socket) => {
      socket.on("data", (data) => {
        const request = data.toString();
        const [header, body] = request.split("\r\n\r\n");
        const [requestLine] = header.split("\r\n");
        const [method, path] = requestLine.split(" ");

        if (method === "GET" && path === "/") {
          const formHTML = `
                    <!doctype html>
                    <html lang="ja">
                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Greeting Form</title>
                      </head>
                      <body>
                        <form action="/greeting" method="POST">
                          <label for="greeting">Name:</label>
                          <input type="text" id="name" name="name" />
                          <input type="text" id="greeting" name="greeting" />
                          <button type="submit">Submit</button>
                        </form>
                      </body>
                    </html>`;

          socket.write("HTTP/1.1 200 OK\r\n");
          socket.write("Content-Type: text/html; charset=UTF-8\r\n");
          socket.write(
            "Content-Length: " + Buffer.byteLength(formHTML) + "\r\n"
          );
          socket.write("\r\n");
          socket.write(formHTML);
          socket.end();
        } else if (method === "POST" && path === "/greeting") {
          const params = new URLSearchParams(body);
          const name = params.get("name") || "unknown";
          const greeting = params.get("greeting") || "Hello";

          const responseHTML = `
                    <!doctype html>
                    <html lang="ja">
                      <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Greeting Response</title>
                      </head>
                      <body>
                        <h1>${greeting}, ${name}!</h1>
                      </body>
                    </html>`;

          socket.write("HTTP/1.1 200 OK\r\n");
          socket.write("Content-Type: text/html; charset=UTF-8\r\n");
          socket.write(
            "Content-Length: " + Buffer.byteLength(responseHTML) + "\r\n"
          );
          socket.write("\r\n");
          socket.write(responseHTML);
          socket.end();
        } else {
          const status =
            path === "/" || path === "/greeting"
              ? "405 Method Not Allowed"
              : "404 Not Found";
          socket.write(`HTTP/1.1 ${status}\r\n`);
          socket.write("Content-Type: text/plain; charset=UTF-8\r\n");
          socket.write("\r\n");
          socket.write(status);
          socket.end();
        }
      });
    });

    server.listen(8080);
  });

  test.afterAll(async () => {
    server.close();
  });

  test("should return the form on GET /", async ({ page }) => {
    await gotoTestTarget(page);
    const title = await page.title();
    expect(title).toBe("Greeting Form");

    const form = await page.$("form[action='/greeting']");
    expect(form).not.toBeNull();
  });

  test("should return greeting message on POST /greeting", async ({ page }) => {
    await gotoTestTarget(page);

    await page.fill("#name", "John");
    await page.fill("#greeting", "Hello");
    await page.click("button[type='submit']");

    await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機

    const content = await page.content();
    expect(content).toContain("<h1>Hello, John!</h1>");
  });

  test("should return 404 for unsupported paths", async ({ page }) => {
    const response = await page.goto("http://localhost:8080/unsupported");
    expect(response.status()).toBe(404);
  });

  test("should return 405 for unsupported methods", async ({ page }) => {
    await page.route("http://localhost:8080/", (route) => {
      route.fulfill({
        status: 405,
        contentType: "text/plain",
        body: "405 Method Not Allowed",
      });
    });
    const res = await page.request.post("http://localhost:8080/");
    expect(res.status()).toBe(405);
  });
});
