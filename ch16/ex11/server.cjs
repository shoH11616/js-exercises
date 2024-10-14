const net = require("net");

// HTMLフォーム
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

// サーバー作成
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();
    const [header, body] = request.split("\r\n\r\n");
    const [requestLine, ...headers] = header.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && path === "/") {
      // "/" が GET されたときの処理
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=UTF-8\r\n");
      socket.write("Content-Length: " + Buffer.byteLength(formHTML) + "\r\n");
      socket.write("\r\n");
      socket.write(formHTML);
      socket.end();
    } else if (method === "POST" && path === "/greeting") {
      // "/greeting" に POST されたときの処理
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
      // 404 または 405 を返す処理
      const status =
        method === "GET" || method === "POST"
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

// サーバーをポート8080でリッスン
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
