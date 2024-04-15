/**
 * 関数にmyCallプロパティを追加する関数。
 * @param {Function} f - myCallプロパティを追加する対象の関数
 */
export function addMyCall(f) {
  f.myCall = function (thisArg, ...args) {
    return this.bind(thisArg)(...args);
  };
}
