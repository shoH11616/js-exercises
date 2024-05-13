import { leToBe, beToLe } from "./index.js";

describe("Endian conversion functions", () => {
  it("converts little endian to big endian correctly", () => {
    const leArray = new Uint32Array([0x12345678]);
    const beArray = leToBe(leArray);

    // 0x12345678 in big endian is 0x78563412
    expect(beArray[0]).toBe(0x78563412);
  });

  it("converts big endian to little endian correctly", () => {
    const beArray = new Uint32Array([0x12345678]);
    const leArray = beToLe(beArray);

    // 0x12345678 in little endian is 0x78563412
    expect(leArray[0]).toBe(0x78563412);
  });
});
