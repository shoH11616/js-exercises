import { expandType } from "./index.js";

describe("expandType", () => {
  it("returns correct type for a number", () => {
    const result = expandType`Value is ${42}`;
    expect(result).toBe("Value is number");
  });

  it("returns correct type for a string", () => {
    const result = expandType`Value is ${"test"}`;
    expect(result).toBe("Value is string");
  });

  it("returns correct type for a boolean", () => {
    const result = expandType`Value is ${true}`;
    expect(result).toBe("Value is boolean");
  });

  it("returns correct type for an object", () => {
    const result = expandType`Value is ${{ key: "value" }}`;
    expect(result).toBe("Value is object");
  });

  it("returns correct type for undefined", () => {
    const result = expandType`Value is ${undefined}`;
    expect(result).toBe("Value is undefined");
  });

  it("returns correct type for a function", () => {
    const result = expandType`Value is ${() => {}}`;
    expect(result).toBe("Value is function");
  });
});
