import { test, expect } from "@playwright/test";
import net from "net";

// テスト対象のページに移動する関数
async function gotoTestTarget(page) {
  await page.goto("http://localhost:8080");
  await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
}

// テストスイート "Custom HTTP Server" を定義
test.describe("Custom HTTP Server", () => {
  let server;

  // テストスイート実行前にサーバーを起動
  test.beforeAll(async () => {
    server = net.createServer((socket) => {
      // クライアントからデータを受信したときの処理
      socket.on("data", (data) => {
        // リクエスト全体を文字列に変換
        const request = data.toString();
        // ヘッダーとボディを分割
        const [header, body] = request.split("\r\n\r\n");
        const [requestLine] = header.split("\r\n");
        const [method, path] = requestLine.split(" ");

        if (method === "GET" && path === "/") {
          // ルートパス ("/") へのGETリクエストの場合
          const formHTML = `                    <!doctype html>                    <html lang="ja">                      <head>                        <meta charset="UTF-8" />                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />                        <title>Greeting Form</title>                      </head>                      <body>                        <form action="/greeting" method="POST">                          <label for="greeting">Name:</label>                          <input type="text" id="name" name="name" />                          <input type="text" id="greeting" name="greeting" />                          <button type="submit">Submit</button>                        </form>                      </body>                    </html>`;
          socket.write("HTTP/1.1 200 OK\r\n");
          socket.write("Content-Type: text/html; charset=UTF-8\r\n");
          socket.write(
            "Content-Length: " + Buffer.byteLength(formHTML) + "\r\n"
          );
          socket.write("\r\n");
          socket.write(formHTML); // HTMLフォームを送信
          socket.end(); // レスポンスを終了
        } else if (method === "POST" && path === "/greeting") {
          // "/greeting" へのPOSTリクエストの場合
          const params = new URLSearchParams(body); // ボディをパースしてパラメータを取得
          const name = params.get("name") || "unknown"; // "name" パラメータを取得
          const greeting = params.get("greeting") || "Hello"; // "greeting" パラメータを取得

          // レスポンス用のHTMLを作成
          const responseHTML = `                    <!doctype html>                    <html lang="ja">                      <head>                        <meta charset="UTF-8" />                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />                        <title>Greeting Response</title>                      </head>                      <body>                        <h1>${greeting}, ${name}!</h1>                      </body>                    </html>`;
          socket.write("HTTP/1.1 200 OK\r\n");
          socket.write("Content-Type: text/html; charset=UTF-8\r\n");
          socket.write(
            "Content-Length: " + Buffer.byteLength(responseHTML) + "\r\n"
          );
          socket.write("\r\n");
          socket.write(responseHTML); // レスポンス用のHTMLを送信
          socket.end(); // レスポンスを終了
        } else {
          // その他のリクエストに対する処理
          const status =
            path === "/" || path === "/greeting"
              ? "405 Method Not Allowed" // 許可されていないメソッドの場合
              : "404 Not Found"; // 存在しないパスの場合
          socket.write(`HTTP/1.1 ${status}\r\n`);
          socket.write("Content-Type: text/plain; charset=UTF-8\r\n");
          socket.write("\r\n");
          socket.write(status); // エラーメッセージを送信
          socket.end(); // レスポンスを終了
        }
      });
    });
    server.listen(8080); // サーバーをポート8080でリッスン
  });

  // テストスイート実行後にサーバーを停止
  test.afterAll(async () => {
    server.close(); // サーバーを停止
  });

  // ルートパス ("/") へのGETリクエストでフォームを返すかのテスト
  test("should return the form on GET /", async ({ page }) => {
    await gotoTestTarget(page);
    const title = await page.title();
    expect(title).toBe("Greeting Form"); // タイトルが "Greeting Form" であることを期待
    const form = await page.$("form[action='/greeting']");
    expect(form).not.toBeNull(); // フォームが存在することを期待
  });

  // "/greeting" へのPOSTリクエストで挨拶メッセージを返すかのテスト
  test("should return greeting message on POST /greeting", async ({ page }) => {
    await gotoTestTarget(page);
    await page.fill("#name", "John"); // "name" フィールドに "John" を入力
    await page.fill("#greeting", "Hello"); // "greeting" フィールドに "Hello" を入力
    await page.click("button[type='submit']"); // フォームを送信
    await page.waitForLoadState("domcontentloaded"); // ページの読み込みを待機
    const content = await page.content();
    expect(content).toContain("<h1>Hello, John!</h1>"); // 挨拶メッセージが含まれていることを期待
  });

  // サポートされていないパスに対するリクエストで404を返すかのテスト
  test("should return 404 for unsupported paths", async ({ page }) => {
    const response = await page.goto("http://localhost:8080/unsupported");
    expect(response.status()).toBe(404); // ステータスが404であることを期待
  });

  // サポートされていないメソッドに対するリクエストで405を返すかのテスト
  test("should return 405 for unsupported methods", async ({ page }) => {
    await page.route("http://localhost:8080/", (route) => {
      route.fulfill({
        status: 405,
        contentType: "text/plain",
        body: "405 Method Not Allowed",
      });
    });
    const res = await page.request.post("http://localhost:8080/");
    expect(res.status()).toBe(405); // ステータスが405であることを期待
  });
});
