// while文を使用したバージョン
export function fibonacciWhile() {
  let result = [1, 1];
  while (result.length < 10) {
    let len = result.length;
    result.push(result[len - 1] + result[len - 2]);
  }
  return result;
}

// do/while文を使用したバージョン
export function fibonacciDoWhile() {
  let result = [1, 1];
  do {
    let len = result.length;
    result.push(result[len - 1] + result[len - 2]);
  } while (result.length < 10);
  return result;
}

// for文を使用したバージョン
export function fibonacciFor() {
  let result = [1, 1];
  for (let i = 2; i < 10; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}
