import fs from "fs";
import fetch from "node-fetch";

async function uploadWithStream() {
  const filePath = "file.txt"; // ファイルのパスを指定
  const url = "http://localhost:8000/foo/bar/hello.txt"; // アップロード先のURL

  const response = await fetch(url, {
    method: "PUT",
    body: fs.createReadStream(filePath),
    duplex: "half",
  });
  const data = await response.text();
  console.log(data);
}

// 実行例
uploadWithStream();
