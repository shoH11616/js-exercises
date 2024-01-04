import { convertNewline } from "./index.js";

// わからなかったため、chatGPTを利用して解いた
describe("convertNewline", () => {
  it("Convert LF to CR+LF", () => {
    const input1 = "Hello\nWorld";
    expect(convertNewline(input1)).toBe("Hello\r\nWorld"); // => pass
  });

  it("Convert CR+LF to LF", () => {
    const input2 = "Hi\r\nThere";
    expect(convertNewline(input2)).toBe("Hi\nThere"); // => pass
  });
});
