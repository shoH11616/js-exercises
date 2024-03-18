/**
 * 配列の全ての要素の合計を計算
 * @param {Array} arr - 数値の配列
 * @return {number} 合計値
 */
export function sum(arr = []) {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * 配列の全ての要素を連結
 * @param {Array} arr - 連結する要素の配列
 * @param {string} separator - 要素間に挿入する文字列
 * @return {string} 連結された文字列
 * @throws {Error} 引数が指定されていない場合にスロー
 */
export function join(arr, separator = ",") {
  if (arr === undefined) {
    throw new Error("No arguments provided to join function");
  }
  return arr.reduce(
    (acc, val, i) =>
      acc +
      (i > 0 ? separator : "") +
      (val !== null && val !== undefined ? val : ""),
    ""
  );
}

/**
 * 配列の要素を逆順
 * @param {Array} arr - 逆順にする配列
 * @return {Array} 逆順にされた配列
 * @throws {Error} 引数が指定されていない場合にスロー
 */
export function reverse(arr) {
  if (arr === undefined) {
    throw new Error("No arguments provided to reverse function");
  }
  return arr.reduce((acc, val) => [val, ...acc], []);
}

/**
 * 配列の全ての要素が指定されたテストをパスするかどうかを判断
 * @param {Array} arr - テストする要素の配列
 * @param {Function} func - 各要素に適用するテスト関数
 * @return {boolean} 全ての要素がテストをパスする場合はtrue、そうでない場合はfalse
 */
export function every(arr = [], func = () => true) {
  return arr.reduce((acc, val, i) => acc && func(val, i, arr), true);
}

/**
 * 配列の少なくとも1つの要素が指定されたテストをパスするかどうかを判断
 * @param {Array} arr - テストする要素の配列
 * @param {Function} func - 各要素に適用するテスト関数
 * @return {boolean} 少なくとも1つの要素がテストをパスする場合はtrue、そうでない場合はfalse
 */
export function some(arr = [], func = () => false) {
  return arr.reduce((acc, val, i) => acc || func(val, i, arr), false);
}
