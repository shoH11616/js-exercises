import { sequenceToObject } from "./index.js";

describe("sequenceToObject", () => {
  it("returns {a: 1, b: 2} for sequenceToObject('a', 1, 'b', 2)", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 }); // => pass
  });

  it("throws an error for sequenceToObject('a', 1, 2)", () => {
    expect(() => sequenceToObject("a", 1, 2)).toThrow(Error); // => pass
  });

  it("throws an error for sequenceToObject(1, 1, 'b', 2)", () => {
    expect(() => sequenceToObject(1, 1, "b", 2)).toThrow(Error); // => pass
  });

  it("returns {a: 1, b: 2} for sequenceToObject(...['a', 1, 'b', 2])", () => {
    expect(sequenceToObject(...["a", 1, "b", 2])).toEqual({ a: 1, b: 2 }); // => pass
  });
});
