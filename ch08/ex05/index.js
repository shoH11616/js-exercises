/**
 * 可変長引数を受け取り、指定された形式のオブジェクトを返却する関数。
 * @param  {...any} values - 可変長引数（奇数番目は文字列、偶数番目は任意の値）
 * @returns {Object} - 各偶数奇数のペアで `{奇数番の値: 偶数番の値}` の形式のオブジェクト
 * @throws {Error} - いずれかの奇数番の値が文字列でない場合、または値の個数の合計が偶数ではない場合
 */
export function sequenceToObject(...values) {
  if (values.length % 2 !== 0) {
    throw new Error("値の個数の合計が偶数ではありません。");
  }

  const obj = {};
  for (let i = 0; i < values.length; i += 2) {
    if (typeof values[i] !== "string") {
      throw new Error("奇数番の値が文字列ではありません。");
    }
    obj[values[i]] = values[i + 1];
  }
  return obj;
}
