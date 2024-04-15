import { C1, C2 } from "./index.js";

describe("C1", () => {
  it("returns 42 for the first call of getX", () => {
    const c1 = new C1();
    expect(c1.getX()).toBe(42); // => pass
  });

  it("does not allow direct access to x", () => {
    const c1 = new C1();
    expect(c1.x).toBeUndefined(); // => pass
  });
});

describe("C2", () => {
  it("returns 42 for the first call of getX", () => {
    const c2 = C2();
    expect(c2.getX()).toBe(42); // => pass
  });

  it("does not allow direct access to x", () => {
    const c2 = C2();
    expect(c2.x).toBeUndefined(); // => pass
  });
});
