import { powerRecursive, powerLoop } from "./index.js";

describe("powerRecursive", () => {
  it("returns 1 for powerRecursive(0, 0)", () => {
    expect(powerRecursive(0, 0)).toBe(1); // => pass
  });

  it("returns 0 for powerRecursive(0, 2)", () => {
    expect(powerRecursive(0, 2)).toBe(0); // => pass
  });

  it("returns 1 for powerRecursive(2, 0)", () => {
    expect(powerRecursive(2, 0)).toBe(1); // => pass
  });

  it("returns 4 for powerRecursive(2, 2)", () => {
    expect(powerRecursive(2, 2)).toBe(4); // => pass
  });

  it("returns 10000000000 for powerRecursive(10, 10)", () => {
    expect(powerRecursive(10, 10)).toBe(10000000000); // => pass
  });
});

describe("powerLoop", () => {
  it("returns 1 for powerLoop(0, 0)", () => {
    expect(powerLoop(0, 0)).toBe(1); // => pass
  });

  it("returns 0 for powerLoop(0, 2)", () => {
    expect(powerLoop(0, 2)).toBe(0); // => pass
  });

  it("returns 1 for powerLoop(2, 0)", () => {
    expect(powerLoop(2, 0)).toBe(1); // => pass
  });

  it("returns 4 for powerLoop(2, 2)", () => {
    expect(powerLoop(2, 2)).toBe(4); // => pass
  });

  it("returns 10000000000 for powerLoop(10, 10)", () => {
    expect(powerLoop(10, 10)).toBe(10000000000); // => pass
  });
});
