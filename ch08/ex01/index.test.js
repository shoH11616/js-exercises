import { printAndReturn, square, currentTime } from "./index.js";

describe("printAndReturn", () => {
  it("returns ['a', 'a', 'a'] for printAndReturn(3, 'a')", () => {
    expect(printAndReturn(3, "a")).toEqual(["a", "a", "a"]); // => pass
  });
});

describe("square", () => {
  it("returns 4 for square(2)", () => {
    expect(square(2)).toBe(4); // => pass
  });

  it("returns 9 for square(3)", () => {
    expect(square(3)).toBe(9); // => pass
  });
});

describe("currentTime", () => {
  it("returns an object with a 'now' property", () => {
    const result = currentTime();
    expect(typeof result).toBe("object"); // => pass
    expect(result).toHaveProperty("now"); // => pass
    expect(result.now instanceof Date).toBe(true); // => pass
  });
});
