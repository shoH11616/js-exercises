import { matrixAddition, matrixMultiplication } from "./index.js";

describe("matrixAddition", () => {
  it("returns the sum of two matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    const expected = [
      [6, 8],
      [10, 12],
    ];
    expect(matrixAddition(a, b)).toEqual(expected); // => pass
  });
});

describe("matrixMultiplication", () => {
  it("returns the product of two matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    const expected = [
      [19, 22],
      [43, 50],
    ];
    // c[0][0] = a[0][0]*b[0][0] + a[0][1]*b[1][0] = 1*5 + 2*7 = 19
    // c[0][1] = a[0][0]*b[0][1] + a[0][1]*b[1][1] = 1*6 + 2*8 = 22
    // c[1][0] = a[1][0]*b[0][0] + a[1][1]*b[1][0] = 3*5 + 4*7 = 43
    // c[1][1] = a[1][0]*b[0][1] + a[1][1]*b[1][1] = 3*6 + 4*8 = 50
    expect(matrixMultiplication(a, b)).toEqual(expected); // => pass
  });
});
