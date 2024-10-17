const net = require("net");

// HTMLフォーム
const formHTML = `<!doctype html>
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
  // クライアントからデータを受信したときの処理
  socket.on("data", (data) => {
    // リクエスト全体を文字列に変換
    const request = data.toString();
    // ヘッダーとボディを分割
    const [header, body] = request.split("\r\n\r\n");
    // リクエストラインとヘッダーを分割
    const [requestLine, ...headers] = header.split("\r\n");
    // メソッドとパスを取得
    const [method, path] = requestLine.split(" ");

    if (method === "GET" && path === "/") {
      // ルートパス ("/") へのGETリクエストの場合
      socket.write("HTTP/1.1 200 OK\r\n");
      socket.write("Content-Type: text/html; charset=UTF-8\r\n");
      socket.write("Content-Length: " + Buffer.byteLength(formHTML) + "\r\n");
      socket.write("\r\n");
      socket.write(formHTML); // HTMLフォームを送信
      socket.end(); // レスポンスを終了
    } else if (method === "POST" && path === "/greeting") {
      // "/greeting" へのPOSTリクエストの場合
      const params = new URLSearchParams(body); // ボディをパースしてパラメータを取得
      const name = params.get("name") || "unknown"; // "name" パラメータを取得
      const greeting = params.get("greeting") || "Hello"; // "greeting" パラメータを取得

      // レスポンス用のHTMLを作成
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
      socket.write(responseHTML); // レスポンス用のHTMLを送信
      socket.end(); // レスポンスを終了
    } else {
      // その他のリクエストに対する処理
      const status =
        method === "GET" || method === "POST"
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

// サーバーをポート8080でリッスン
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
