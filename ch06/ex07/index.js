/**
 * 複数のソースオブジェクトからターゲットオブジェクトへプロパティをコピーする
 * Object.assign()と等価な関数
 *
 * @param {Object} target - プロパティがコピーされるターゲットオブジェクト
 * @param {...Object} sources - 1つ以上のソースオブジェクト。これらのオブジェクトのプロパティがターゲットオブジェクトにコピーされる
 * @return {Object} - 全てのソースオブジェクトのプロパティを持つようになったターゲットオブジェクト
 */
export function assign(target, ...sources) {
  sources.forEach((source) => {
    // Reflect.ownKeys ... 指定されたオブジェクトの全ての独自プロパティキーを配列として返す
    Reflect.ownKeys(source).forEach((key) => {
      Reflect.set(target, key, source[key]);
    });
  });
  return target;
}
