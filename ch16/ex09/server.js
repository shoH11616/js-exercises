import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

/**
 * 特定のエンドポイント "/test/mirror" に対して、受信したリクエストをそのまま送り返す。
 */
app.use("/test/mirror", (req, res) => {
  // リクエストの情報をヘッダーとして設定
  res.setHeader("Content-Type", "text/plain;charset=UTF-8");
  res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
  for (const header in req.headers) {
    res.write(`${header}: ${req.headers[header]}\r\n`);
  }
  res.write("\r\n");
  // リクエストボディをそのままレスポンスに流す
  req.pipe(res);
});

/**
 * 静的ファイルサーバーとして、指定されたルートディレクトリのファイルを提供する。
 */
app.use((req, res) => {
  let filename = req.path.substring(1); // 最初の/を取り除く
  filename = filename.replace(/\.\.\//g, ""); // ../を禁止する
  filename = path.resolve(__dirname, filename); // 絶対パスに変換する

  // ファイルの拡張子によってContent-Typeを設定する
  let type;
  switch (path.extname(filename)) {
    case ".html":
    case ".htm":
      type = "text/html";
      break;
    case ".js":
      type = "text/javascript";
      break;
    case ".css":
      type = "text/css";
      break;
    case ".png":
      type = "image/png";
      break;
    case ".txt":
      type = "text/plain";
      break;
    default:
      type = "application/octet-stream";
      break;
  }

  // ファイルを読み取り、レスポンスとして返す
  fs.createReadStream(filename)
    .on("open", function () {
      res.setHeader("Content-Type", type);
      this.pipe(res);
    })
    .on("error", function (err) {
      res.setHeader("Content-Type", "text/plain;charset=UTF-8");
      res.status(404).end(err.message);
    });
});

// 指定されたポートでサーバーを起動する
const PORT = process.argv[2] || 8000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
