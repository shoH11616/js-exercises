import { judgeEqual } from "./index.js";

describe("judgeEqual", () => {
    it("(0.3 - 0.2, 0.1) is true", () => {
        expect(judgeEqual(0.3 - 0.2, 0.1)).toBe(true); // => pass
    });
    it("(0.2 - 0.1, 0.1) is true", () => {
        expect(judgeEqual(0.2 - 0.1, 0.1)).toBe(true); // => pass
    });
});