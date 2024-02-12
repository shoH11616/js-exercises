import { bitCount } from "./index.js";

describe("bitCount", () => {
    it("returns 3 for bitCount(0b111)", () => {
      expect(bitCount(0b111)).toBe(3); // => pass
    });
  
    it("returns 31 for bitCount(0b1111111111111111111111111111111)", () => {
      expect(bitCount(0b1111111111111111111111111111111)).toBe(31); // => pass
    });
  });