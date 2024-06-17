import { readdirSync, statSync } from "fs";
import { join } from "path";

/**
 * 指定されたディレクトリ内のファイル/ディレクトリを再帰的に探索するジェネレータ関数
 * このジェネレータ関数は、ファイルとディレクトリのみを考慮し、シンボリックリンクやブロックデバイスなどは無視する
 *
 * @generator
 * @function walk
 * @param {string} rootPath - ルートパス
 * @yields {object} ファイル/ディレクトリの情報を持つオブジェクト
 */
export function* walk(rootPath) {
  const files = readdirSync(rootPath);

  for (const file of files) {
    const filePath = join(rootPath, file);
    const stats = statSync(filePath);

    yield {
      path: filePath,
      isDirectory: stats.isDirectory(),
    };

    if (stats.isDirectory()) {
      yield* walk(filePath);
    }
  }
}
