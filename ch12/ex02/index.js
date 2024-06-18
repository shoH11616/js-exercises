/**
 * ジェネレータ関数を使わずに、フィボナッチ数列を生成するイテレータを返す関数
 * @returns {Object} フィボナッチ数列を生成するイテレータ
 */
export function fibonacciSequenceIterator() {
  let x = 0,
    y = 1;
  return {
    // フィボナッチ数列の次の数値を生成する
    next: function () {
      const current = y;
      // 次のフィボナッチ数を計算
      [x, y] = [y, x + y];
      // 現在のフィボナッチ数とイテレーションの論理値を返す
      return { value: current, done: false };
    },
  };
}
