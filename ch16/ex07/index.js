import fs from "fs";

/**
 * 指定のパスがファイルかディレクトリか、あるいはそれ以外かを判定する関数。
 *
 * @param {string} path - 調査するパス文字列
 * @returns {Promise<string>} - 'file'、'directory'、または 'other' を返す
 */
export async function checkEntry(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        if (stats.isFile()) {
          resolve("file");
        } else if (stats.isDirectory()) {
          resolve("directory");
        } else {
          resolve("other");
        }
      }
    });
  });
}
