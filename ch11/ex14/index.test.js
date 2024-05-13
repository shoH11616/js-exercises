import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  it("returns sorted array for ['つ', 'っ', 'は', 'ば', 'ぱ']", () => {
    expect(sortJapanese(["つ", "っ", "は", "ば", "ぱ"])).toEqual([
      "っ",
      "つ",
      "は",
      "ば",
      "ぱ",
    ]); // => pass
  });

  it("returns sorted array for ['あ', 'い', 'う', 'え', 'お']", () => {
    expect(sortJapanese(["あ", "い", "う", "え", "お"])).toEqual([
      "あ",
      "い",
      "う",
      "え",
      "お",
    ]); // => pass
  });
});

describe("toJapaneseDateString", () => {
  it("returns '令和6年4月2日' for new Date(2024, 3, 2)", () => {
    expect(toJapaneseDateString(new Date(2024, 3, 2))).toBe("令和6年4月2日"); // => pass
  });

  it("returns '昭和64年1月7日' for new Date(1989, 0, 7)", () => {
    expect(toJapaneseDateString(new Date(1989, 0, 7))).toBe("昭和64年1月7日"); // => pass
  });
});
