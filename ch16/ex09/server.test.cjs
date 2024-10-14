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

before((done) => {
  server = exec("node server.js 3000");
  fs.writeFileSync(testFilePath, "This is a test file.");
  if (!fs.existsSync(testDirPath)) {
    fs.mkdirSync(testDirPath);
  }
  setTimeout(done, 1000); // サーバーが起動するまで待機
});

after((done) => {
  server.kill();
  fs.unlinkSync(testFilePath);
  fs.rmdirSync(testDirPath, { recursive: true });
  done();
});

describe("Express Server", () => {
  it("should mirror requests to /test/mirror", (done) => {
    request("http://localhost:3000")
      .post("/test/mirror")
      .set("Test-Header", "TestValue")
      .send("Request body content")
      .expect(200)
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

  it("should serve static files", (done) => {
    request("http://localhost:3000")
      .get("/testfile.txt")
      .expect(200)
      .expect("Content-Type", /text\/plain/)
      .expect("This is a test file.")
      .end(done);
  });

  it("should return 404 for non-existent files", (done) => {
    request("http://localhost:3000")
      .get("/nonexistent.txt")
      .expect(404)
      .end(done);
  });
});
