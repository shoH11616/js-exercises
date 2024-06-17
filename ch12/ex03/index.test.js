import { counter } from "./index.js";

describe("counter", () => {
  it("increments the counter", () => {
    const c = counter();
    expect(c.next().value).toBe(0); // => pass
    expect(c.next().value).toBe(1); // => pass
    expect(c.next().value).toBe(2); // => pass
  });

  it("resets the counter when an exception is thrown", () => {
    const c = counter();
    expect(c.next().value).toBe(0); // => pass
    expect(c.next().value).toBe(1); // => pass
    c.throw(new Error());
    expect(c.next().value).toBe(0); // => なぜかこれが1になる
  });
});
