import fs from "fs";
import { readLines } from "./index.js";

describe("readLines", () => {
  const filePath = "./test.txt";
  const fileContent = "line1\nline2\nline3\nline4";

  // テスト前に一時的なテストファイルを作成します
  beforeAll(() => {
    fs.writeFileSync(filePath, fileContent);
  });

  // テスト後に一時的なテストファイルを削除します
  afterAll(() => {
    fs.unlinkSync(filePath);
  });

  it("reads lines from a file", () => {
    const lines = readLines(filePath);
    expect(lines.next().value).toBe("line1");
    expect(lines.next().value).toBe("line2");
    expect(lines.next().value).toBe("line3");
    expect(lines.next().value).toBe("line4");
    expect(lines.next().done).toBe(true);
  });

  it("closes the file when the generator is done", () => {
    const lines = readLines(filePath);
    expect(lines.next().value).toBe("line1");
    lines.return();
    const { value, done } = lines.next();
    expect(value).toBeUndefined();
    expect(done).toBe(true);
  });
});
