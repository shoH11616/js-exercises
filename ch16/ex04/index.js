import fs from "fs";
import iconv from "iconv-lite";

// Shift_JISで保存されたファイルを非同期で読み込む関数
async function readShiftJISFile(filePath) {
  // ファイルをバイナリとして読み込む
  const data = await fs.promises.readFile(filePath);
  // Shift_JISからUTF-8に変換
  const text = iconv.decode(data, "Shift_JIS");
  // コンソールに表示
  console.log(text);
}

// ファイルパスを指定して関数を呼び出し
readShiftJISFile("./hello.txt");
