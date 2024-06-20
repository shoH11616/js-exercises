import fs from "fs";
import { join } from "path";
import { walk } from "./index.js";

describe("walk", () => {
  const rootPath = "./testDir";
  const subDirPath = join(rootPath, "subDir");
  const rootFilePath = join(rootPath, "file1.txt");
  const subDirFilePath = join(subDirPath, "file2.txt");

  // テスト前に一時的なテストディレクトリとファイルを作成
  beforeAll(() => {
    fs.mkdirSync(rootPath);
    fs.writeFileSync(rootFilePath, "file1");
    fs.mkdirSync(subDirPath);
    fs.writeFileSync(subDirFilePath, "file2");
  });

  // テスト後に一時的なテストディレクトリとファイルを削除
  afterAll(() => {
    fs.unlinkSync(rootFilePath);
    fs.unlinkSync(subDirFilePath);
    fs.rmdirSync(subDirPath);
    fs.rmdirSync(rootPath);
  });

  it("recursively walks through directories", () => {
    // ディレクトリを再帰的に探索するかテスト=>pass
    const paths = [...walk(rootPath)].map((info) => info.path);
    expect(paths).toContain(rootFilePath);
    expect(paths).toContain(subDirFilePath);
  });

  it("returns objects with 'path' and 'isDirectory' properties", () => {
    // 返されるオブジェクトがpathとisDirectoryプロパティを持っているかテスト=>pass
    const items = [...walk(rootPath)];
    for (const item of items) {
      expect(item).toHaveProperty("path");
      expect(item).toHaveProperty("isDirectory");
    }
  });

  it("sets 'isDirectory' to true for directories and false for files", () => {
    // isDirectoryがディレクトリであればtrue,ファイルであればfalseに設定されるかテスト=>pass
    const items = [...walk(rootPath)];
    for (const item of items) {
      const isDirectory = fs.statSync(item.path).isDirectory();
      expect(item.isDirectory).toBe(isDirectory);
    }
  });
});
