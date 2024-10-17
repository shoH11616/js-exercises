import fs from "fs";
import fetch from "node-fetch";

/**
 * ファイルをストリームとして指定されたURLにアップロードする非同期関数
 */
async function uploadWithStream() {
  const filePath = "file.txt"; // ファイルのパスを指定
  const url = "http://localhost:8000/foo/bar/hello.txt"; // アップロード先のURL

  // fetchを使ってファイルをPUTリクエストでアップロードする
  const response = await fetch(url, {
    method: "PUT",
    body: fs.createReadStream(filePath),
    duplex: "half",
  });

  // レスポンスのテキストを取得してコンソールに出力する
  const data = await response.text();
  console.log(data);
}

// 実行例
uploadWithStream();
