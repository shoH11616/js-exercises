/**
 * 1からnまでの数値に対して、FizzBuzzのルールに従って出力する
 * @param {number} n - 出力する最大の数値
 */
function fizzbuzz(n) {
  [...Array(n)].map((_, i) => {
    const x = i + 1;
    const output = (x % 3 ? "" : "Fizz") + (x % 5 ? "" : "Buzz");
    console.log(output || x);
  });
}

/**
 * 2つの配列の要素間の二乗差の合計を計算する
 * @param {Array} f - 最初の配列
 * @param {Array} g - 二番目の配列
 * @return {number} 二乗差の合計
 */
function sumOfSquaredDifference(f, g) {
  return f.reduce((acc, val, i) => acc + (val - g[i]) ** 2, 0);
}

/**
 * 配列内の偶数の合計が42以上かどうかを判断します。
 * @param {Array} array - 判定対象の配列
 * @return {boolean} 偶数の合計が42以上の場合はtrue、そうでない場合はfalse
 */
function sumOfEvensIsLargerThan42(array) {
  return (
    array
      .filter((x) => x % 2 === 0)
      .reduce((acc, val) => {
        return acc + val >= 42 ? acc + val : acc;
      }, 0) >= 42
  );
}
