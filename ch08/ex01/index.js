/**
 * 自然数`n`と英数文字`c`を引数にとり、文字`c`を`n`回コンソール出力してから文字`c`を`n`個含む配列を返す関数。
 * @param {number} n - 自然数
 * @param {string} c - 英数文字
 * @returns {string[]} - 文字`c`を`n`個含む配列
 */
export const printAndReturn = (n, c) => {
  Array(n)
    .fill()
    .forEach(() => console.log(c));
  // 文字cがn回コンソールに出力される。
  return Array(n).fill(c);
  // cをn個含む配列が作成され、その配列が返される。
};
// 引数が一つ以上ある場合、括弧は必要。
// また、関数本体が複数の文からなる場合、波括弧も必要

/**
 * 数値`x`を引数にとり、`x`の二乗の数値を返す関数。
 * @param {number} x - 数値
 * @returns {number} - `x`の二乗の数値
 */
export const square = (x) => x * x;
// 引数が一つの場合、括弧は省略可能。
// また、関数本体が一つの式からなる場合、波括弧とreturnも省略可能。

/**
 * 引数なしで、現在時刻のプロパティ`now`を含むオブジェクトを返す関数。
 * @returns {Object} - 現在時刻のプロパティ`now`を含むオブジェクト
 */
export const currentTime = () => ({ now: new Date() });
// 引数がない場合、括弧は必要。
// 関数本体が一つの式からなる場合、波括弧とreturnも省略可能。
