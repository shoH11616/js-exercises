import { equalArrays } from "./index.js";

describe("equalArrays", () => {
  it("returns true with different arrays", () => {
    const a = [1,2,Number.MAX_SAFE_INTEGER + 1];
    const b = [1,2,Number.MAX_SAFE_INTEGER + 2];

    // Number.MAX_SAFE_INTEGERより大きな整数はNumber.MAX_SAFE_INTEGERとみなされるため、値が違うのにtrueがかえる
    expect(equalArrays(a, b)).toBe(true); // => pass
  });
});
