/**
 * 呼び出しごとに素数を順番に返す無限ジェネレータ
 * このジェネレータは、エラトステネスの篩を使って素数を計算する
 *
 * @generator
 * @function primes
 * @yields {number} 次の素数
 */
export function* primes() {
  const sieve = [];
  let k = 2;

  while (true) {
    if (!sieve[k]) {
      yield k;
      let l = k * k;
      while (l < 100) {
        // はじめはNumber.MAX_SAFE_INTEGERにしていたが、うまく動作しなかった。
        sieve[l] = true;
        l += k;
      }
    }
    k++;
  }
}
