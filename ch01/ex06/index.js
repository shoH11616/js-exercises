// 修正後（ 参考: https://ja.javascript.info/task/fibonacci-numbers）
export function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// export function fib() {
//   if (n <= 1) {
//     return n;
//   } else {
//     return fib(n-1) + fib(n-2);
//   }
// }