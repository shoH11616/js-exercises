/**
 * ベースのURL、追加するクエリ、パスを持つオブジェクトを引数に取り、
 * ベースのURLのパスとクエリを修正した文字列を返す関数
 * @param {Object} params - パラメータ
 * @param {string} params.base - ベースのURL
 * @param {Array<Array<string>>} params.addQuery - 追加するクエリ
 * @param {string} params.path - パス
 * @return {string} - 修正されたURL
 * @throws {Error} - ベースのURLが無効な形式の場合
 */
export function modifyUrl({ base, addQuery, path }) {
  // URLの形式が正しいかチェック
  try {
    new URL(base);
  } catch (e) {
    throw new Error("Invalid URL format");
  }

  // URLオブジェクトを作成
  const url = new URL(base);

  // パスの修正
  if (path) {
    url.pathname = new URL(path, url).pathname;
  }

  // クエリの追加
  if (addQuery) {
    addQuery.forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
}
