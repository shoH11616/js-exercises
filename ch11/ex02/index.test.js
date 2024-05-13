import { cache, slowFn } from "./index.js";

describe("cache", () => {
  it("caches the result of a function", () => {
    const cachedSlowFn = cache(slowFn);
    const obj = { key: "value", key2: "value2" };

    const firstCallResult = cachedSlowFn(obj);
    const secondCallResult = cachedSlowFn(obj);

    expect(firstCallResult).toBe(secondCallResult);
  });

  it("does not cache the result for different arguments", () => {
    const cachedSlowFn = cache(slowFn);
    const obj1 = { key1: "value1", key2: "value2" }; // 2 properties
    const obj2 = { key1: "value1" }; // 1 property

    const result1 = cachedSlowFn(obj1);
    const result2 = cachedSlowFn(obj2);

    expect(result1).not.toBe(result2);
  });
});
