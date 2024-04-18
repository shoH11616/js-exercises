// 二分累乗法

/**
 * 数値`x`の`n`乗を計算する関数（再帰版）。
 * @param {number} x - 基数
 * @param {number} n - 指数
 * @returns {number} - `x`の`n`乗の数値
 */
export function powerRecursive(x, n) {
  // 指数nが0の場合、結果は1になる
  if (n === 0) return 1;
  // 指数nが偶数である場合
  if (n % 2 === 0) {
    // n/2の指数で再帰的に計算
    const y = powerRecursive(x, n / 2);
    // その結果を2乗して返す。x^n = (x^(n/2))^2
    return y * y;
    // nが奇数の場合
  } else {
    // n-1の指数で再帰的に計算し、その結果にxをかけて返す
    // x^n = x * x^(n-1)
    return x * powerRecursive(x, n - 1);
  }
}

/**
 * 数値`x`の`n`乗を計算する関数（ループ版）。
 * @param {number} x - 基数
 * @param {number} n - 指数
 * @returns {number} - `x`の`n`乗の数値
 */
export function powerLoop(x, n) {
  let result = 1; //結果を格納
  let base = x; // 基数を格納
  // 指数が0より大きい場合、ループを継続
  while (n > 0) {
    // nが奇数の場合
    if (n % 2 === 1) {
      result *= base;
    }
    // baseを二乗。
    base *= base;
    // 指数を2で割り、その結果の床関数を新たなnとする。
    // 次のループで処理するべき指数にnが更新
    n = Math.floor(n / 2);
  }
  return result;
}
