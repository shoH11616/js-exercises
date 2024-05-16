import { cache, slowFn } from "./index.js";

describe("cache", () => {
  it("caches the result of a function", () => {
    // `cache` 関数を `slowFn` に適用して、結果をキャッシュする新しい関数 `cachedSlowFn` を作成
    const cachedSlowFn = cache(slowFn);
    const obj = { key: "value", key2: "value2" };

    // `cachedSlowFn` を `obj` で2回呼び出し、その結果をそれぞれ変数に保存
    const firstCallResult = cachedSlowFn(obj);
    const secondCallResult = cachedSlowFn(obj);

    // 2回の呼び出し結果が同じであること（キャッシュが機能すること）を検証
    expect(firstCallResult).toBe(secondCallResult);
  });

  it("does not cache the result for different arguments", () => {
    const cachedSlowFn = cache(slowFn);
    // 2つの異なるオブジェクト `obj1` と `obj2` を作成
    const obj1 = { key1: "value1", key2: "value2" }; // 2 properties
    const obj2 = { key1: "value1" }; // 1 property

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    // 2つの異なるオブジェクトに対する呼び出し結果が異なることを検証
    // これはキャッシュが異なる引数に対しては別々に機能していることを意味
    expect(result1).not.toBe(result2);
  });
});
