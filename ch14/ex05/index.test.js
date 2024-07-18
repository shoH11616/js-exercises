import { expandType } from "./index.js";

describe("expandType", () => {
  // 数値の場合に正しい型を返すことをテスト
  it("returns correct type for a number", () => {
    const result = expandType`Value is ${42}`;
    expect(result).toBe("Value is number");
  });

  // 文字列の場合に正しい型を返すことをテスト
  it("returns correct type for a string", () => {
    const result = expandType`Value is ${"test"}`;
    expect(result).toBe("Value is string");
  });

  // ブール値の場合に正しい型を返すことをテスト
  it("returns correct type for a boolean", () => {
    const result = expandType`Value is ${true}`;
    expect(result).toBe("Value is boolean");
  });

  // オブジェクトの場合に正しい型を返すことをテスト
  it("returns correct type for an object", () => {
    const result = expandType`Value is ${{ key: "value" }}`;
    expect(result).toBe("Value is object");
  });

  // undefinedの場合に正しい型を返すことをテスト
  it("returns correct type for undefined", () => {
    const result = expandType`Value is ${undefined}`;
    expect(result).toBe("Value is undefined");
  });

  // 関数の場合に正しい型を返すことをテス
  it("returns correct type for a function", () => {
    const result = expandType`Value is ${() => {}}`;
    expect(result).toBe("Value is function");
  });
});
