/**
 * Cクラスは、プライベートフィールドxを持つ。
 */
export class C1 {
  #x = 42;

  /**
   * xフィールドのgetter。外部から直接アクセスできない。
   * @returns {number} 現在のxの値
   */
  getX() {
    return this.#x;
  }
}
/**
 * C関数は、クロージャを使用してプライベート変数xを持つ。
 * @returns {object} xのgetterを持つオブジェクト
 */
export function C2() {
  // ローカル変数
  let x = 42;

  /**
   * xのgetter。外部から直接アクセスできない。
   * @returns {number} 現在のxの値
   */
  function getX() {
    return x;
  }

  // getX関数をプロパティに持つオブジェクトを返す。
  return { getX };
}
