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
  const files = readdirSync(rootPath); // 指定されたディレクトリ内のファイル・ディレクトリの一覧を取得

  for (const file of files) {
    // 取得した一覧を順に処理
    const filePath = join(rootPath, file); // 絶対パス
    const stats = statSync(filePath); // 絶対パスに対応するファイル/ディレクトリの情報を取得

    yield {
      // ディレクトリであるかどうかを判断
      path: filePath,
      isDirectory: stats.isDirectory(),
    };

    if (stats.isDirectory()) {
      // ファイルパスがディレクトリだった場合、再帰的にそのディレクトリを再探索
      yield* walk(filePath);
    }
  }
}
