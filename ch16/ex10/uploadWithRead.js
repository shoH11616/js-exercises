import fs from "fs";
import fetch from "node-fetch";

async function uploadWithRead() {
  const filePath = "file.txt"; // ファイルのパスを指定
  const url = "http://localhost:8000/foo/bar/hello.txt"; // アップロード先のURL

  const buffer = fs.readFileSync(filePath);
  const response = await fetch(url, {
    method: "PUT",
    body: buffer,
    duplex: "half",
  });
  const data = await response.text();
  console.log(data);
}

// 実行例
uploadWithRead();
