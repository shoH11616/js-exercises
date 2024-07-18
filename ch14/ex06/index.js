/**
 * 引数として与えられたオブジェクトのメソッド呼び出し履歴を記録するProxyを作成する。
 * @param {Object} target - メソッド呼び出し履歴を記録する対象のオブジェクト。
 * @return {Array} 2つの要素を持つ配列。1つ目の要素はProxy、2つ目の要素はメソッド呼び出し履歴の配列。
 */
export function createLoggingProxy(target) {
  // メソッド呼び出し履歴を保存する配列を初期化
  const history = [];
  // Proxyを作成
  const proxy = new Proxy(target, {
    // 'get'トラップを定義
    get(target, property) {
      // プロパティが関数の場合、その呼び出し履歴を記録する関数を返す
      return (...args) => {
        if (typeof target[property] === "function") {
          // 呼び出し履歴を配列に追加
          history.push({
            time: new Date(),
            method: property,
            args: args,
          });
          // 元の関数を返す
          return target[property];
        }
        // プロパティが関数でない場合、その値をそのまま返す
        return target[property];
      };
    },
  });
  // Proxyとメソッド呼び出し履歴の配列を返す
  return [proxy, history];
}
