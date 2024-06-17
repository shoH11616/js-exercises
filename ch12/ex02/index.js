/**
 * ジェネレータ関数を使わずに、フィボナッチ数列を生成するイテレータを返す関数
 * @returns {Object} フィボナッチ数列を生成するイテレータ
 */
export function fibonacciSequenceIterator() {
  let x = 0,
    y = 1;
  return {
    next: function () {
      const current = y;
      [x, y] = [y, x + y];
      return { value: current, done: false };
    },
  };
}
