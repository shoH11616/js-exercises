import * as fs from "node:fs";

// fs.readdir の Promise 版。指定されたパスのディレクトリ内のファイルとサブディレクトリの名前を取得
export function readdir(path, options) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        // エラーが発生した場合（err が null でない場合）、Promise を reject してエラーを返す
        reject(err);
        return;
      }
      //エラーが発生しなかった場合、Promise を resolve してファイルのリストを返す
      resolve(files);
    });
  });
}

// fs.stat の Promise 版。指定したパスのファイルやディレクトリのメタデータを取得するための関数。
export function stat(path, options) {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}
