import fs from "fs";

/**
 * 指定のパスがファイルかディレクトリか、あるいはそれ以外かを判定する関数。
 *
 * @param {string} path - 調査するパス文字列
 * @returns {Promise<string>} - 'file'、'directory'、または 'other' を返す
 */
export async function checkEntry(path) {
  return new Promise((resolve, reject) => {
    // パスの統計情報を非同期に取得する
    fs.stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        // ファイルの場合
        if (stats.isFile()) {
          resolve("file");
          // ディレクトリの場合
        } else if (stats.isDirectory()) {
          resolve("directory");
          // それ以外の場合
        } else {
          resolve("other");
        }
      }
    });
  });
}
