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
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);

  let fd;
  try {
    fd = openSync(filePath, "r");
    let leftover = "";
    let bytesRead;

    while ((bytesRead = readSync(fd, buffer, 0, bufferSize, null)) > 0) {
      let lines = (leftover + buffer.toString("utf8", 0, bytesRead)).split(
        "\n"
      );
      leftover = lines.pop();
      for (let line of lines) {
        yield line;
      }
    }

    if (leftover) {
      yield leftover;
    }
  } finally {
    if (fd !== undefined) {
      closeSync(fd);
    }
  }
}
