// push: 配列の末尾に新しい要素を追加。新しい配列の長さを返す
// pop: 配列の末尾の要素を削除し、その要素を返す
// shift: 配列の先頭の要素を削除し、その要素を返す
// unshift: 配列の先頭に新しい要素を追加。新しい配列の長さを返す
// sort: 配列の要素をソートする。デフォルトでは、要素は文字列として比較され、Unicodeの文字列順にソートされる
//      カスタムの比較関数を提供することも可能。

/**
 * 配列の末尾の要素を削除した新しい配列を返す
 * @param {Array} arr - 元の配列
 * @return {Array} 末尾の要素を削除した新しい配列
 */
export function pop(arr) {
  return arr.slice(0, arr.length - 1);
}

/**
 * 配列の末尾に新しい要素を追加した新しい配列を返す
 * @param {Array} arr - 元の配列
 * @param {*} item - 追加する要素
 * @return {Array} 末尾に新しい要素を追加した新しい配列
 */
export function push(arr, item) {
  return [...arr, item];
}

/**
 * 配列の先頭の要素を削除した新しい配列を返す
 * @param {Array} arr - 元の配列
 * @return {Array} 先頭の要素を削除した新しい配列
 */
export function shift(arr) {
  return arr.slice(1);
}

/**
 * 配列の先頭に新しい要素を追加した新しい配列を返す
 * @param {Array} arr - 元の配列
 * @param {*} item - 追加する要素
 * @return {Array} 先頭に新しい要素を追加した新しい配列
 */
export function unshift(arr, item) {
  return [item, ...arr];
}

/**
 * 配列の要素をソートした新しい配列を返す
 * @param {Array} arr - 元の配列
 * @param {Function} compareFunction - 要素を比較する関数
 * @return {Array} 要素をソートした新しい配列
 */
export function sort(arr, compareFunction) {
  return [...arr].sort(compareFunction);
}
