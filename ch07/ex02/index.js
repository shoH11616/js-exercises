/**
 * 1からnまでの数値に対して、FizzBuzzのルールに従って出力する
 * @param {number} n - 出力する最大の数値
 */
function fizzbuzz(n) {
  [...Array(n)].map((_, i) => {
    // 1からnまでの配列を作成し、各要素に対してmap関数を適用
    const x = i + 1; // 配列のインデックスは0から始まるため、1を加えて実際の数値を取得
    const output = (x % 3 ? "" : "Fizz") + (x % 5 ? "" : "Buzz");
    console.log(output || x); // outputが空文字列（つまり、数値が3でも5でも割り切れない）の場合は、数値自体を出力
  });
}

/**
 * 2つの配列の要素間の二乗差の合計を計算する
 * @param {Array} f - 最初の配列
 * @param {Array} g - 二番目の配列
 * @return {number} 二乗差の合計
 */
function sumOfSquaredDifference(f, g) {
  return f.reduce((acc, val, i) => acc + (val - g[i]) ** 2, 0); // 配列fの各要素と配列gの対応する要素の差の二乗を計算し、それらの合計を返す
}

/**
 * 配列内の偶数の合計が42以上かどうかを判断します。
 * @param {Array} array - 判定対象の配列
 * @return {boolean} 偶数の合計が42以上の場合はtrue、そうでない場合はfalse
 */
function sumOfEvensIsLargerThan42(array) {
  return (
    array
      .filter((x) => x % 2 === 0) // 配列から偶数だけを抽出
      .reduce((acc, val) => {
        return acc + val >= 42 ? acc + val : acc; // 偶数の合計が42以上になった場合は、その後の偶数を加算せずに合計値をそのまま保持
      }, 0) >= 42 // 最終的な合計値が42以上かどうかを判断
  );
}
