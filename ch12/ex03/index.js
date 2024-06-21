/**
 * 増加し続ける整数を生成するカウンタのジェネレータ
 * このジェネレータは、throw()メソッドを使ってカウンタをゼロに初期化する
 *
 * @generator
 * @function counter
 * @yields {number} 次の整数
 */
export function* counter() {
  // カウンタの初期値0を代入
  let i = 0;
  while (true) {
    try {
      i++;
      yield i;
    } catch (e) {
      i = 0;
      yield 0;
    }
  }
}
