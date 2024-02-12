import { parseJson } from "./index.js";

describe("parseJson", () => {
  it("returns success for valid JSON string", () => {
    const input = '{"a":1,"b":2}';
    const expected = { success: true, data: { a: 1, b: 2 } };
    expect(parseJson(input)).toEqual(expected); // => pass
  });

  it("returns error for invalid JSON string", () => {
    const input = '{a:1,b:2}';
    const result = parseJson(input);
    expect(result.success).toBe(false);
    expect(result.error).toContain('SyntaxError'); // => pass
  });
});
