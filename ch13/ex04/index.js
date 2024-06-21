import * as path from "node:path";
import * as fs from "node:fs/promises";

/**
 * Fetches the size of the first file in a directory.
 * ディレクトリの最初のファイルのサイズを取得する
 *
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<number|null>} - A promise that resolves to the size of the first file, or null if the directory is empty.
 */
export function fetchFirstFileSize(dirPath) {
  return fs.readdir(dirPath).then((files) => {
    // fs.readdir 関数を呼び出し、その結果（ディレクトリ内のファイルの配列）を処理する Promise チェーン
    if (files.length === 0) {
      // ディレクトリが空（ファイルがない）場合
      return null;
    }
    //ディレクトリにファイルがある場合、最初のファイルの fs.stat 関数を呼び出し、その結果（ファイルの統計情報）を処理する Promise チェーンを開始
    // statはファイルのサイズを返す
    return fs.stat(path.join(dirPath, files[0])).then((stats) => stats.size);
  });
}

/**
 * Fetches the sum of the sizes of all files in a directory.
 * ディレクトリ内のすべてのファイルのサイズの合計を取得する
 *
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<number>} - A promise that resolves to the total size of all files.
 */
export function fetchSumOfFileSizes(dirPath) {
  // fs.readdir 関数を呼び出し、その結果を処理する Promise チェーンを開始
  return fs.readdir(dirPath).then((files) => {
    // ディレクトリ内の各ファイルに対して fs.stat 関数を呼び出し、その結果を処理する Promise の配列を作成
    const promises = files.map((file) =>
      fs.stat(path.join(dirPath, file)).then((stats) => stats.size)
    );
    // Promise.all 関数を使用して、すべての Promise が解決するのを待つ。
    return Promise.all(promises).then((sizes) =>
      // 全てのファイルのサイズの合計を返す。
      sizes.reduce((a, b) => a + b, 0)
    );
  });
}
