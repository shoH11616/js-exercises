import { TypeMap } from "./index.js";

describe("TypeMap", () => {
  it("sets and gets values correctly", () => {
    class Foo {}
    const typeMap = new TypeMap();
    typeMap.set(String, new String("string"));
    typeMap.set(Number, new Number(123));
    typeMap.set(Foo, new Foo());

    expect(typeMap.get(String)).toBeInstanceOf(String);
    expect(typeMap.get(Number)).toBeInstanceOf(Number);
    expect(typeMap.get(Foo)).toBeInstanceOf(Foo);
  });

  it("throws error when setting invalid key or value", () => {
    class Foo {}
    const typeMap = new TypeMap();

    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow();

    expect(() => {
      typeMap.set(Foo, "not a Foo");
    }).toThrow();
  });
});
