import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese", () => {
  it("sorts Japanese strings, ignoring case and diacritic differences", () => {
    // 単純な文字列のソート
    expect(sortJapanese(["つくえ", "ツクエ", "つくえ", "ツクエ"])).toEqual([
      "つくえ",
      "つくえ",
      "ツクエ",
      "ツクエ",
    ]);
    // "は"、"ば"、"ぱ"は、濁点・半濁点を無視すると同じと見なされますが、
    // Unicodeコードポイントの順序により"は"が最初に、次に"ば"、最後に"ぱ"が来る
    expect(sortJapanese(["は", "ば", "ぱ"])).toEqual(["は", "ば", "ぱ"]);
    expect(sortJapanese(["カキクケコ", "かきくけこ", "がぎぐげご"])).toEqual([
      "かきくけこ",
      "がぎぐげご",
      "カキクケコ",
    ]);
    expect(sortJapanese(["さしすせそ", "サシスセソ", "ざじずぜぞ"])).toEqual([
      "さしすせそ",
      "ざじずぜぞ",
      "サシスセソ",
    ]);

    // 長い文章を含む配列のソート
    // 日本語の自然な辞書順に従ってソートされる
    expect(
      sortJapanese([
        "新しいプロジェクトを始める時のワクワク感は格別です。",
        "毎日コツコツと努力することが大切です。",
        "読書をするときは、静かな場所が一番です。",
        "コーヒーと共に、朝のひとときを楽しんでいます。",
      ])
    ).toEqual([
      "コーヒーと共に、朝のひとときを楽しんでいます。",
      "新しいプロジェクトを始める時のワクワク感は格別です。",
      "毎日コツコツと努力することが大切です。",
      "読書をするときは、静かな場所が一番です。",
    ]);
  });
});

describe("toJapaneseDateString", () => {
  // 令和のテストケース
  it("returns '令和元年5月1日' for new Date(2019, 4, 1)", () => {
    expect(toJapaneseDateString(new Date(2019, 4, 1))).toBe("令和元年5月1日");
  });

  // 平成のテストケース
  it("returns '平成元年1月8日' for new Date(1989, 0, 8)", () => {
    expect(toJapaneseDateString(new Date(1989, 0, 8))).toBe("平成元年1月8日");
  });
  it("returns '平成31年4月30日' for new Date(2019, 3, 30)", () => {
    expect(toJapaneseDateString(new Date(2019, 3, 30))).toBe("平成31年4月30日");
  });

  // 昭和のテストケース
  it("returns '昭和元年12月25日' for new Date(1926, 11, 25)", () => {
    expect(toJapaneseDateString(new Date(1926, 11, 25))).toBe(
      "昭和元年12月25日"
    );
  });
  it("returns '昭和63年1月7日' for new Date(1988, 0, 7)", () => {
    expect(toJapaneseDateString(new Date(1988, 0, 7))).toBe("昭和63年1月7日");
  });

  // 大正のテストケース
  it("returns '大正元年7月30日' for new Date(1912, 6, 30)", () => {
    expect(toJapaneseDateString(new Date(1912, 6, 30))).toBe("大正元年7月30日");
  });
  it("returns '大正15年12月24日' for new Date(1926, 11, 24)", () => {
    expect(toJapaneseDateString(new Date(1926, 11, 24))).toBe(
      "大正15年12月24日"
    );
  });

  // 明治のテストケース
  it("returns '明治元年10月23日' for new Date(1868, 9, 23)", () => {
    expect(toJapaneseDateString(new Date(1868, 9, 23))).toBe(
      "明治元年10月23日"
    );
  });
  it("returns '明治45年7月29日' for new Date(1912, 6, 29)", () => {
    expect(toJapaneseDateString(new Date(1912, 6, 29))).toBe("明治45年7月29日");
  });
});
