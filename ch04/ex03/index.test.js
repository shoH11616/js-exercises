import { sub } from "./index.js";

describe("sub", () => {
  it("returns 5 for sub(8, 3)", () => {
    expect(sub(8, 3)).toBe(5); 
  });

  it("returns -5 for sub(3, 8)", () => {
    expect(sub(3, 8)).toBe(-5); 
  });

  it("returns 0 for sub(5, 5)", () => {
    expect(sub(5, 5)).toBe(0); 
  });
});