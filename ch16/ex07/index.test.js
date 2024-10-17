import { checkEntry } from "./index.js";
import fs from "fs";

// テスト用のファイルとディレクトリを準備
beforeAll(() => {
  // テスト用のファイルを作成
  fs.writeFileSync("testfile.txt", "This is a test file.");
  // テスト用のディレクトリを作成
  if (!fs.existsSync("testdir")) {
    fs.mkdirSync("testdir");
  }
});

describe("checkEntry", () => {
  // ファイルパスがファイルであることを確認するテスト
  it("returns 'file' for a file path", async () => {
    const result = await checkEntry("testfile.txt");
    expect(result).toBe("file");
  });

  // ディレクトリパスがディレクトリであることを確認するテスト
  it("returns 'directory' for a directory path", async () => {
    const result = await checkEntry("testdir");
    expect(result).toBe("directory");
  });

  // シンボリックリンクが 'other' であることを確認するテスト
  it("returns 'other' for a symbolic link", async () => {
    fs.symlinkSync("testfile.txt", "testlink");
    const result = await checkEntry("testlink");
    expect(result).toBe("other");
    fs.unlinkSync("testlink"); // cleanup
  });

  // 無効なパスの場合にエラーが投げられることを確認するテスト
  it("throws an error for an invalid path", async () => {
    await expect(checkEntry("invalidpath")).rejects.toThrow();
  });
});

// テスト後のクリーンアップ
afterAll(() => {
  fs.unlinkSync("testfile.txt");
  fs.rmdirSync("testdir", { recursive: true });
});
