/**
 * 行列aと行列bの加算
 *
 * @param {number[][]} a - 加算する最初の行列
 * @param {number[][]} b - 加算する2番目の行列
 * @return {number[][]} - 加算された行列
 */
export function matrixAddition(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    // 行列aの各行に対してループを開始
    result[i] = [];
    for (let j = 0; j < a[0].length; j++) {
      // 行列aの各列に対してループを開始
      result[i][j] = a[i][j] + b[i][j]; // 行列aと行列bの同じ位置にある要素を加算し、結果を新しい行列の同じ位置に格納
    }
  }
  return result;
}

/**
 * 行列aと行列bの乗算
 *
 * @param {number[][]} a - 乗算する最初の行列
 * @param {number[][]} b - 乗算する2番目の行列
 * @return {number[][]} - 乗算された行列
 */
export function matrixMultiplication(a, b) {
  let result = [];
  for (let i = 0; i < a.length; i++) {
    // 行列aの各行に対してループを開始
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      // 行列bの各列に対してループを開始
      result[i][j] = 0; // 結果の行列の新しい要素を初期化
      for (let k = 0; k < a[0].length; k++) {
        // 行列aの各列（または行列bの各行）に対してループを開始
        result[i][j] += a[i][k] * b[k][j]; // 行列aの行と行列bの列の各要素を乗算し、それらの結果を加算
      }
    }
  }
  return result;
}
