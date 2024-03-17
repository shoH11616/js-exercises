import { getAllProperties } from "./index.js";

describe("getAllProperties", () => {
  // 単純なオブジェクトのすべてのプロパティが返される
  it("returns all properties for a simple object", () => {
    let obj = { a: 1, b: 2 };
    expect(getAllProperties(obj)).toEqual(["a", "b"]);
  });

  // 列挙不可能なプロパティと継承されたプロパティを含むオブジェクトのすべてのプロパティが返されることを確認
  it("returns all properties including non-enumerable and inherited ones", () => {
    let prototype = { c: 3, d: 4 };
    let obj = Object.create(prototype);
    Object.defineProperty(obj, "a", { value: 1, enumerable: false });
    obj.b = 2;
    expect(getAllProperties(obj)).toEqual(["a", "b", "c", "d"]);
  });

  // Symbolプロパティを含むオブジェクトのすべてのプロパティが返されることを確認
  it("returns all properties including Symbol properties", () => {
    let obj = { a: 1 };
    let sym = Symbol("b");
    obj[sym] = 2;
    expect(getAllProperties(obj)).toContain("a");
    expect(getAllProperties(obj)).toContain(sym);
  });
});
