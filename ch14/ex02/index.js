/**
 * 配列のようなクラスで、Arrayを継承しない
 */
export class MyArrayLike {
  constructor(array) {
    for (let i = 0; i < array.length; i++) {
      this[i] = array[i];
    }
    this.length = array.length;
  }
}

/**
 * Arrayを継承し、map()とslice()の結果としてMyArrayLikeのオブジェクトを返す
 */
export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  static get [Symbol.species]() {
    return MyArrayLike;
  }

  map(callback) {
    const result = super.map(callback);
    return new MyArrayLike(result);
  }

  slice(start, end) {
    const result = super.slice(start, end);
    return new MyArrayLike(result);
  }
}
