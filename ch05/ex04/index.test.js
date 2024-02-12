import { fibonacciWhile, fibonacciDoWhile, fibonacciFor } from "./index.js";

const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe("fibonacciWhile", () => {
  it("returns the first 10 numbers of the Fibonacci sequence", () => {
    expect(fibonacciWhile()).toEqual(expected); // => pass
  });
});

describe("fibonacciDoWhile", () => {
  it("returns the first 10 numbers of the Fibonacci sequence", () => {
    expect(fibonacciDoWhile()).toEqual(expected); // => pass
  });
});

describe("fibonacciFor", () => {
  it("returns the first 10 numbers of the Fibonacci sequence", () => {
    expect(fibonacciFor()).toEqual(expected); // => pass
  });
});
