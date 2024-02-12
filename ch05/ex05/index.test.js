import { filterEvenProperties } from "./index.js";

describe("filterEvenProperties", () => {
  it("returns {b: 2} for {a: 1, b: 2, c: 3}", () => {
    expect(filterEvenProperties({a: 1, b: 2, c: 3})).toEqual({b: 2}); // => pass
  });

  it("returns {} for {a: 1, c: 3, e: 5}", () => {
    expect(filterEvenProperties({a: 1, c: 3, e: 5})).toEqual({}); // => pass
  });

  it("returns {b: 2, d: 4} for {a: 1, b: 2, c: 3, d: 4, e: 5}", () => {
    expect(filterEvenProperties({a: 1, b: 2, c: 3, d: 4, e: 5})).toEqual({b: 2, d: 4}); // => pass
  });
});