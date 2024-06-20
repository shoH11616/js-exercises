import fs from "fs";
import { readLines } from "./index.js";

describe("readLines", () => {
  // テスト用の一時ファイルのパスと内容を定義
  const filePath = "./test.txt";
  const fileContent = "line1\nline2\nline3\nline4";

  // テスト前に一時的なテストファイルを作成
  beforeAll(() => {
    fs.writeFileSync(filePath, fileContent);
  });

  // テスト後に一時的なテストファイルを削除
  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  it("reads lines from a file", () => {
    // ファイルから行を読み込むテスト=>pass
    const lines = readLines(filePath);
    expect(lines.next().value).toBe("line1");
    expect(lines.next().value).toBe("line2");
    expect(lines.next().value).toBe("line3");
    expect(lines.next().value).toBe("line4");
    expect(lines.next().done).toBe(true);
  });

  it("closes the file when the generator is done", () => {
    // ジェネレータが終了したときにファイルを閉じるかテスト=>pass
    const lines = readLines(filePath);
    expect(lines.next().value).toBe("line1");
    lines.return();
    const { value, done } = lines.next();
    expect(value).toBeUndefined();
    expect(done).toBe(true);
  });
});
