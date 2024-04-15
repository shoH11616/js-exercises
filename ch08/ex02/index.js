/**
 * 数値`x`の`n`乗を計算する関数（再帰版）。
 * @param {number} x - 基数
 * @param {number} n - 指数
 * @returns {number} - `x`の`n`乗の数値
 */
export function powerRecursive(x, n) {
  if (n === 0) return 1;
  if (n % 2 === 0) {
    const y = powerRecursive(x, n / 2);
    return y * y;
  } else {
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
  let result = 1;
  let base = x;
  while (n > 0) {
    if (n % 2 === 1) {
      result *= base;
    }
    base *= base;
    n = Math.floor(n / 2);
  }
  return result;
}
