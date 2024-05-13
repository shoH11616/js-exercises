/**
 * TypeMap クラス
 * コンストラクタ関数をキーとし、そのクラスのインスタンスを値とする Map クラス
 */
export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  /**
   * 指定したコンストラクタ関数とそのクラスのインスタンスをマップに追加する
   * @param {Function} key - コンストラクタ関数
   * @param {Object} value - コンストラクタ関数のクラスのインスタンス
   * @throws {Error} key がコンストラクタ関数でない場合、または value が key のインスタンスでない場合
   */
  set(key, value) {
    if (typeof key !== "function" || !(value instanceof key)) {
      throw new Error("Invalid key or value");
    }
    this.map.set(key, value);
  }

  /**
   * 指定したコンストラクタ関数に対応するクラスのインスタンスを取得する
   * @param {Function} key - コンストラクタ関数
   * @returns {Object} コンストラクタ関数のクラスのインスタンス
   */
  get(key) {
    return this.map.get(key);
  }
}
