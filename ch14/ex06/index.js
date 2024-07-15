/**
 * 引数として与えられたオブジェクトのメソッド呼び出し履歴を記録するProxyを作成する。
 * @param {Object} target - メソッド呼び出し履歴を記録する対象のオブジェクト。
 * @return {Array} 2つの要素を持つ配列。1つ目の要素はProxy、2つ目の要素はメソッド呼び出し履歴の配列。
 */
export function createLoggingProxy(target) {
  const history = [];

  const proxy = new Proxy(target, {
    get(target, property) {
      return (...args) => {
        if (typeof target[property] === "function") {
          history.push({
            time: new Date(),
            method: property,
            args: args,
          });
          return target[property];
        }
        return target[property];
      };
    },
  });

  return [proxy, history];
}
