import { checkEntry } from "./index.js";
import fs from "fs";

// テスト用のファイルとディレクトリを準備
beforeAll(() => {
  fs.writeFileSync("testfile.txt", "This is a test file.");
  if (!fs.existsSync("testdir")) {
    fs.mkdirSync("testdir");
  }
});

describe("checkEntry", () => {
  it("returns 'file' for a file path", async () => {
    const result = await checkEntry("testfile.txt");
    expect(result).toBe("file");
  });

  it("returns 'directory' for a directory path", async () => {
    const result = await checkEntry("testdir");
    expect(result).toBe("directory");
  });

  it("returns 'other' for a symbolic link", async () => {
    fs.symlinkSync("testfile.txt", "testlink");
    const result = await checkEntry("testlink");
    expect(result).toBe("other");
    fs.unlinkSync("testlink"); // cleanup
  });

  it("throws an error for an invalid path", async () => {
    await expect(checkEntry("invalidpath")).rejects.toThrow();
  });
});

// テスト後のクリーンアップ
afterAll(() => {
  fs.unlinkSync("testfile.txt");
  fs.rmdirSync("testdir", { recursive: true });
});
