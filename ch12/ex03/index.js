/**
 * 増加し続ける整数を生成するカウンタのジェネレータ
 * このジェネレータは、throw()メソッドを使ってカウンタをゼロに初期化する
 *
 * @generator
 * @function counter
 * @yields {number} 次の整数
 */
export function* counter() {
  let i = 0;
  while (true) {
    try {
      yield i;
    } catch (e) {
      i = 0;
      continue;
    }
    i++;
  }
}
