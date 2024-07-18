/**
 * 不変で設定不可能なオブジェクトを返す関数
 * @returns {Object} プロパティaが1のオブジェクト
 */
export function unwritableAndUnconfigurableObj() {
  // 'a'プロパティが1のオブジェクトを凍結して返す
  return Object.freeze({ a: 1 });
}

/**
 * 書き込み可能で設定不可能なオブジェクトを返す関数
 * @returns {Object} プロパティbが2のオブジェクト
 */
export function writableAndUnconfigurableObj() {
  // 'b'プロパティが2のオブジェクトを作成
  const obj = { b: 2 };
  // 'b'プロパティを書き込み可能、設定不可能にする
  Object.defineProperty(obj, "b", {
    writable: true,
    configurable: false,
  });
  // オブジェクトを返す
  return obj;
}

/**
 * ネストされた不変オブジェクトを返す関数
 * @returns {Object} プロパティcがネストされたオブジェクトのオブジェクト
 */
export function nestedUnwritableObj() {
  // 'c'プロパティがネストされたオブジェクトのオブジェクトを凍結して返す
  return Object.freeze({
    c: Object.freeze({
      d: Object.freeze({
        e: 3,
      }),
    }),
  });
}
