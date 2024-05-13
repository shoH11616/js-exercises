/**
 * オブジェクトを引数に取る関数の結果をキャッシュする関数を生成する
 * @param {Function} f - オブジェクトを引数に取る関数
 * @returns {Function} - 引数の関数の結果をキャッシュする関数
 */
export function cache(f) {
  const weakMap = new WeakMap();

  return function (obj) {
    if (!weakMap.has(obj)) {
      weakMap.set(obj, f(obj));
    }
    return weakMap.get(obj);
  };
}

/**
 * 引数として与えられたオブジェクトに基づいて、そのプロパティの数を数える時間のかかる計算を行う
 * @param {Object} obj - 何らかのオブジェクト
 * @returns {any} - 計算結果
 */
export function slowFn(obj) {
  let count = 0;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
    }
  }
  return count;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
