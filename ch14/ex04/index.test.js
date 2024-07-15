import { Hiragana } from "./index.js";

describe("Hiragana", () => {
  it("returns hiragana when string is expected", () => {
    const hiragana = new Hiragana("あ");
    expect(hiragana + "").toBe("あ");
  });

  it("returns UTF-16 code unit when number is expected", () => {
    const hiragana = new Hiragana("あ");
    expect(+hiragana).toBe(12354);
  });

  it("returns hiragana when neither string nor number is expected", () => {
    const hiragana = new Hiragana("あ");
    expect(`${hiragana}`).toBe("あ");
  });
});
