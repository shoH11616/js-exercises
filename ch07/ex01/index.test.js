import { matrixAddition, matrixMultiplication } from "./index.js";

describe("matrixAddition", () => {
  it("returns the sum of two matrices", () => {
    const a = [[1, 2], [3, 4]];
    const b = [[5, 6], [7, 8]];
    const expected = [[6, 8], [10, 12]];
    expect(matrixAddition(a, b)).toEqual(expected); // => pass
  });
});

describe("matrixMultiplication", () => {
  it("returns the product of two matrices", () => {
    const a = [[1, 2], [3, 4]];
    const b = [[5, 6], [7, 8]];
    const expected = [[19, 22], [43, 50]];
    expect(matrixMultiplication(a, b)).toEqual(expected); // => pass
  });
});