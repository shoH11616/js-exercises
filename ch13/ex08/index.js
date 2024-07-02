import * as path from "node:path";
import * as fs from "node:fs/promises";

// 指定したディレクトリ内のファイル一覧を取得する。非同期なので、awaitキーワードを使用し結果が変えるまで待つ。
export async function fetchFirstFileSize(dirPath) {
  // fs.readdir関数を使用して、指定したディレクトリ内のファイル一覧を取得。非同期なので、awaitキーワードを使用し結果が変えるまで待つ。
  const files = await fs.readdir(dirPath);
  // ファイル一覧が空（つまり、ディレクトリ内にファイルがない）場合、関数はnullを返す。
  if (files.length === 0) {
    return null;
  }
  const stats = await fs.stat(path.join(dirPath, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(dirPath) {
  const files = await fs.readdir(dirPath);
  let total = 0;
  for (const file of files) {
    const stats = await fs.stat(path.join(dirPath, file));
    total += stats.size;
  }
  return total;
}
