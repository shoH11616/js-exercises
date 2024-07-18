import { Hiragana } from "./index.js";

describe("Hiragana", () => {
  // 文字列が期待される場合にひらがなを返すことをテスト
  it("returns hiragana when string is expected", () => {
    const hiragana = new Hiragana("あ");
    // 文字列に変換したときに'あ'を返すことを確認
    expect(hiragana + "").toBe("あ");
  });

  // 数値が期待される場合にUTF-16のコードユニットを返すことをテスト
  it("returns UTF-16 code unit when number is expected", () => {
    const hiragana = new Hiragana("あ");
    // 数値に変換したときに12354を返すことを確認
    expect(+hiragana).toBe(12354);
  });

  // 文字列でも数値でもないものが期待される場合にひらがなを返すことをテスト
  it("returns hiragana when neither string nor number is expected", () => {
    const hiragana = new Hiragana("あ");
    // テンプレートリテラルで文字列に変換したときに'あ'を返すことを確認
    expect(`${hiragana}`).toBe("あ");
  });
});
