/**
 * オブジェクトを引数に取る関数の結果をキャッシュする関数を生成する
 * @param {Function} f - オブジェクトを引数に取る関数
 * @returns {Function} - 引数の関数の結果をキャッシュする関数
 */
export function cache(f) {
  // WeakMap はキーとしてオブジェクトのみを許容し、これらのキーに対する参照が弱いため、
  // ガベージコレクションの対象となりやすい
  const weakMap = new WeakMap();

  return function (obj) {
    // 引数のオブジェクト `obj` が `weakMap` にまだ存在しない場合、
    // `f(obj)` の結果を `weakMap` に追加
    if (!weakMap.has(obj)) {
      weakMap.set(obj, f(obj));
    }
    // `weakMap` から `obj` の結果を取得して返す
    // これにより、同じオブジェクトに対する関数の呼び出しは、最初の1回のみ実行され、
    // その後はキャッシュされた結果が返される
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
  // この関数はオブジェクトのプロパティの数を数えるために使用されるが
  // 大きなオブジェクトや複雑なオブジェクトの場合は時間がかかる可能性がある
  return count;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);
