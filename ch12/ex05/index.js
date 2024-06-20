import { openSync, readSync, closeSync } from "fs";

/**
 * 指定されたファイルパスを受け取り、そのファイルを改行コード `\n` の出現ごとに分割して返すジェネレータ関数
 * このジェネレータ関数は、一定のバッファサイズごとにファイルを読み込み、イテレータのループが途中で終了した場合でもファイルをクローズする
 *
 * @generator
 * @function readLines
 * @param {string} filePath - ファイルパス
 * @yields {string} ファイルの次の行
 */
export function* readLines(filePath) {
  const bufferSize = 1024; // バッファサイズを定義
  const buffer = Buffer.alloc(bufferSize); // 指定したサイズのバッファを確保

  let fd; // ファイルディスクリプタを保持するための変数
  try {
    fd = openSync(filePath, "r"); // ファイルを開く
    let leftover = ""; // バッファから読み込んだデータのうち、まだ処理されていない残りの部分を保持する変数
    let bytesRead; // 一度読み込んだバイト数

    // 読み込むデータが存在しなくなるまでreafSync関数でファイルから指定したバイト数のデータを読み込みバッファに格納する
    while ((bytesRead = readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      let lines = (leftover + buffer.toString("utf8", 0, bytesRead)).split(
        "\n"
      );
      leftover = lines.pop();
      for (let line of lines) {
        // 配列の各要素を処理（ファイルの各行）
        yield line;
      }
    }

    // 処理されなかったデータがあるかどうかチェック
    if (leftover) {
      yield leftover;
    }
  } finally {
    if (fd !== undefined) {
      // 必ずファイルを閉じる
      closeSync(fd);
    }
  }
}
