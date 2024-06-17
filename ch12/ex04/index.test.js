import { primes } from "./index.js";

describe("primes", () => {
  it("generates the first five prime numbers", () => {
    const p = primes();
    expect(p.next().value).toBe(2); // => pass
    expect(p.next().value).toBe(3); // => pass
    expect(p.next().value).toBe(5); // => pass
    expect(p.next().value).toBe(7); // => pass
    expect(p.next().value).toBe(11); // => pass
  });
});
