/**
 * Arrayのように動作するが、Arrayを継承しないクラス'MyArrayLike'を定義
 */
export class MyArrayLike {
  constructor(array) {
    // 入力された配列の各要素を、このオブジェクトのプロパティとして設定
    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }
    // 配列の長さをこのオブジェクトの'length'プロパティとして設定
    this.length = array.length;
  }
}

/**
 * Arrayを継承し、map()とslice()の結果としてMyArrayLikeのオブジェクトを返す
 */
export class MyArray extends Array {
  constructor(items) {
    // 親クラスのコンストラクタを呼び出し、入力された要素を持つ配列を作成
    super(...items);
  }

  // 'Symbol.species'プロパティをオーバーライドし、'MyArrayLike'を返すゲッターを定義
  static get [Symbol.species]() {
    return MyArrayLike;
  }

  // 'map'メソッドをオーバーライドし、結果として'MyArrayLike'のインスタンスを返す
  map(callback) {
    // 親クラスの'map'メソッドを呼び出し、結果を取得
    const result = super.map(callback);
    // 結果を'MyArrayLike'のインスタンスとして返す
    return new MyArrayLike(result);
  }

  // 'slice'メソッドをオーバーライドし、結果として'MyArrayLike'のインスタンスを返す
  slice(start, end) {
    // 親クラスの'slice'メソッドを呼び出し、結果を取得
    const result = super.slice(start, end);
    // 結果を'MyArrayLike'のインスタンスとして返す
    return new MyArrayLike(result);
  }
}
