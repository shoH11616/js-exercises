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
    // ベースのURLが有効な形式かどうかをチェックするために、try-catchブロックを使用
    // URLクラスのコンストラクタを使用して、ベースのURLが有効かどうかをテスト
    new URL(base);
  } catch (e) {
    // ベースのURLが無効な形式の場合、エラー
    throw new Error("Invalid URL format");
  }

  // URLオブジェクトを作成
  const url = new URL(base);

  // パスの修正
  if (path) {
    // 新しいURLオブジェクトを作成し、そのpathnameプロパティを現在のURLオブジェクトのpathnameに設定
    url.pathname = new URL(path, url).pathname;
  }

  // クエリの追加
  if (addQuery) {
    // addQuery配列の各要素（キーと値のペア）に対してループを行い、
    // searchParams.appendメソッドを使用してURLにクエリパラメータを追加
    addQuery.forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  return url.toString();
}
