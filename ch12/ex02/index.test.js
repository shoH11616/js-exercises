import { fibonacciSequenceIterator } from "./index.js";

describe("fibonacciSequenceIterator", () => {
  it("returns the correct sequence for the first 10 calls", () => {
    const it = fibonacciSequenceIterator();
    expect(it.next().value).toBe(1); // => pass
    expect(it.next().value).toBe(1); // => pass
    expect(it.next().value).toBe(2); // => pass
    expect(it.next().value).toBe(3); // => pass
    expect(it.next().value).toBe(5); // => pass
    expect(it.next().value).toBe(8); // => pass
    expect(it.next().value).toBe(13); // => pass
    expect(it.next().value).toBe(21); // => pass
    expect(it.next().value).toBe(34); // => pass
    expect(it.next().value).toBe(55); // => pass
  });

  it("returns false for done property", () => {
    const it = fibonacciSequenceIterator();
    expect(it.next().done).toBe(false); // => pass
  });
});
