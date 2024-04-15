import { instanceOf } from "./index.js";

describe("instanceOf", () => {
  it("returns true for an instance of a base class and its constructor", () => {
    class Base {}
    class Derived extends Base {}
    class FurtherDerived extends Derived {}

    const obj = new FurtherDerived();
    expect(instanceOf(obj, Base)).toBe(true); // => pass
  });

  it("returns false for an instance and a constructor that are not in an inheritance relationship", () => {
    class A {}
    class B {}

    const obj = new A();
    expect(instanceOf(obj, B)).toBe(false); // => pass
  });
});
