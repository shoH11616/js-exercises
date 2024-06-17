import fs from "fs";
import { join } from "path";
import { walk } from "./index.js";

describe("walk", () => {
  const rootPath = "./testDir";
  const subDirPath = join(rootPath, "subDir");
  const rootFilePath = join(rootPath, "file1.txt");
  const subDirFilePath = join(subDirPath, "file2.txt");

  // テスト前に一時的なテストディレクトリとファイルを作成します
  beforeAll(() => {
    fs.mkdirSync(rootPath);
    fs.writeFileSync(rootFilePath, "file1");
    fs.mkdirSync(subDirPath);
    fs.writeFileSync(subDirFilePath, "file2");
  });

  // テスト後に一時的なテストディレクトリとファイルを削除します
  afterAll(() => {
    fs.unlinkSync(rootFilePath);
    fs.unlinkSync(subDirFilePath);
    fs.rmdirSync(subDirPath);
    fs.rmdirSync(rootPath);
  });

  it("recursively walks through directories", () => {
    const paths = [...walk(rootPath)].map((info) => info.path);
    expect(paths).toContain(rootFilePath);
    expect(paths).toContain(subDirFilePath);
  });
});
