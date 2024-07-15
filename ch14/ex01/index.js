/**
 * 不変で設定不可能なオブジェクトを返す関数
 * @returns {Object} プロパティaが1のオブジェクト
 */
export function unwritableAndUnconfigurableObj() {
  return Object.freeze({ a: 1 });
}

/**
 * 書き込み可能で設定不可能なオブジェクトを返す関数
 * @returns {Object} プロパティbが2のオブジェクト
 */
export function writableAndUnconfigurableObj() {
  const obj = { b: 2 };
  Object.defineProperty(obj, "b", {
    writable: true,
    configurable: false,
  });
  return obj;
}

/**
 * ネストされた不変オブジェクトを返す関数
 * @returns {Object} プロパティcがネストされたオブジェクトのオブジェクト
 */
export function nestedUnwritableObj() {
  return Object.freeze({
    c: Object.freeze({
      d: Object.freeze({
        e: 3,
      }),
    }),
  });
}
