// Express Server
// 1) should mirror requests to /test/mirror
// ✔ should serve static files
// ✔ should return 404 for non-existent files

// 2 passing (1s)
// 1 failing

// 1) Express Server
//    should mirror requests to /test/mirror:
//  Error: Invalid response
//   at Context.<anonymous> (server.test.cjs:34:8)
//   at process.processImmediate (node:internal/timers:478:21)
// ----
//   at C:\Users\mikis\OneDrive\デスクトップ\仕事用\JavaScriptKenshu\exercises-main-exercises\js-exercises\ch16\ex09\server.test.cjs:36:17

const request = require("supertest");
const { describe, it, before, after } = require("mocha");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

let server;
const testFilePath = path.join(__dirname, "testfile.txt");
const testDirPath = path.join(__dirname, "testdir");

// テスト前のセットアップ：サーバー起動とテスト用ファイル・ディレクトリの作成
before((done) => {
  server = exec("node server.js 3000"); // サーバーをポート3000で起動
  fs.writeFileSync(testFilePath, "This is a test file."); // テスト用ファイルを作成
  if (!fs.existsSync(testDirPath)) {
    fs.mkdirSync(testDirPath); // テスト用ディレクトリを作成
  }
  setTimeout(done, 1000); // サーバーが起動するまで1秒待機
});

// テスト後のクリーンアップ：サーバー停止とテスト用ファイル・ディレクトリの削除
after((done) => {
  server.kill(); // サーバーを停止
  fs.unlinkSync(testFilePath); // テスト用ファイルを削除
  fs.rmdirSync(testDirPath, { recursive: true }); // テスト用ディレクトリを削除
  done();
});

// Expressサーバーのテストスイート
describe("Express Server", () => {
  // /test/mirrorに対するリクエストをミラーリングするかのテスト
  it("should mirror requests to /test/mirror", (done) => {
    request("http://localhost:3000")
      .post("/test/mirror")
      .set("Test-Header", "TestValue") // カスタムヘッダーをセット
      .send("Request body content") // リクエストボディを送信
      .expect(200) // ステータス200を期待
      .expect((res) => {
        if (!res.text.includes("POST /test/mirror HTTP/1.1"))
          throw new Error("Invalid response");
        if (!res.text.includes("test-header: TestValue"))
          throw new Error("Header not mirrored");
        if (!res.text.includes("Request body content"))
          throw new Error("Body not mirrored");
      })
      .end(done);
  });

  // 静的ファイルを提供するかのテスト
  it("should serve static files", (done) => {
    request("http://localhost:3000")
      .get("/testfile.txt")
      .expect(200) // ステータス200を期待
      .expect("Content-Type", /text\/plain/) // Content-Typeがtext/plainであることを期待
      .expect("This is a test file.") // ファイルの内容を期待
      .end(done);
  });

  // 存在しないファイルに対して404を返すかのテスト
  it("should return 404 for non-existent files", (done) => {
    request("http://localhost:3000")
      .get("/nonexistent.txt")
      .expect(404) // ステータス404を期待
      .end(done);
  });
});
