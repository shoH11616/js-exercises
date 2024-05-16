import { leToBe, beToLe } from "./index.js";

describe("Endian conversion functions", () => {
  it("converts little endian to big endian correctly", () => {
    // リトルエンディアンのバイト列を表す Uint32Array を作成
    const leArray = new Uint32Array([0x12345678]);
    // `leToBe` 関数を使って、ビッグエンディアンに変換
    const beArray = leToBe(leArray);

    // 変換されたビッグエンディアンの値が期待通りであるかを検証
    // 0x12345678 in big endian is 0x78563412
    expect(beArray[0]).toBe(0x78563412);
  });

  it("converts big endian to little endian correctly", () => {
    // ビッグエンディアンのバイト列を表す Uint32Array を作成
    const beArray = new Uint32Array([0x12345678]);
    // `beToLe` 関数を使って、リトルエンディアンに変換
    const leArray = beToLe(beArray);

    // 変換されたリトルエンディアンの値が期待通りであるかを検証
    // 0x12345678 in little endian is 0x78563412
    expect(leArray[0]).toBe(0x78563412);
  });
});
