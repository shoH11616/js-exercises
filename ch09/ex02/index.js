/**
 * Cクラスは、値が読み出される度に1ずつ増加するフィールドxを持つ。
 */
export class C {
  #value = 0;

  /**
   * xフィールドのgetter。値を読み出す度に、フィールドの値が1ずつ増加する。
   * @returns {number} 現在のxの値
   */
  get x() {
    return this.#value++;
  }
}
