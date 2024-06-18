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
      // ジェネレータ関数の実行を一時停止し値を返す
      yield i;
    } catch (e) {
      // エラーがキャッチされた場合はカウンタをリセット
      i = 0;
      // ループの次のイテレーションに直接ジャンプ
      continue;
    }
    // インクリメント
    i++;
  }
}
