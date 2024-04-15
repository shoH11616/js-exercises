/**
 * 残余パラメータとして任意の数の関数を受け取り、いずれかの関数が true を返せば true を返す新たな関数を返す関数。
 * @param  {...Function} funcs - 任意の数の関数
 * @returns {Function} - 新しい関数
 */
export function any(...funcs) {
  return function (...args) {
    return funcs.some((func) => func(...args));
  };
}

/**
 * 引数として 2 つの関数を受け取り、1 つ目の関数で発生した例外を 2 つ目の関数の引数として処理し結果を返す新たな関数を返す関数。
 * @param {Function} tryFunc - 例外が発生する可能性のある関数
 * @param {Function} catchFunc - 例外を処理する関数
 * @returns {Function} - 新しい関数
 */
export function catching(tryFunc, catchFunc) {
  return function (...args) {
    try {
      return tryFunc(...args);
    } catch (e) {
      return catchFunc(e);
    }
  };
}
