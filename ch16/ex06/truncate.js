import fs from "fs";

// 既存のファイルにデータを書き込む
fs.writeFileSync("example.txt", "Hello, World!");

// ファイルのサイズを拡張する
fs.truncateSync("example.txt", 20);

console.log("File truncated");
