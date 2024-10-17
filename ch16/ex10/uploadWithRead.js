import fs from "fs";
import fetch from "node-fetch";

/**
 * ファイルを読み込んで指定されたURLにアップロードする非同期関数
 */
async function uploadWithRead() {
  const filePath = "file.txt"; // ファイルのパスを指定
  const url = "http://localhost:8000/foo/bar/hello.txt"; // アップロード先のURL

  // ファイルを同期的に読み込む
  const buffer = fs.readFileSync(filePath);

  // fetchを使ってファイルをPUTリクエストでアップロードする
  const response = await fetch(url, {
    method: "PUT",
    body: buffer,
    duplex: "half",
  });

  // レスポンスのテキストを取得してコンソールに出力する
  const data = await response.text();
  console.log(data);
}

// 実行例
uploadWithRead();
