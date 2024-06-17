import { walk } from "./index.js";
import { promises as fs } from "fs";
import { join, dirname } from "path";
import os from "os";

describe("walk", () => {
  // テスト用の一時ディレクトリを作成します
  const testDir = join(os.tmpdir(), "test-walk");
  const testFiles = [
    "file1.txt",
    "file2.txt",
    join("dir1", "file3.txt"),
    join("dir1", "file4.txt"),
    join("dir2", "file5.txt"),
  ];

  beforeAll(async () => {
    // テスト用のファイルとディレクトリを作成します
    await fs.mkdir(testDir, { recursive: true });
    for (const file of testFiles) {
      await fs.mkdir(join(testDir, dirname(file)), { recursive: true });
      await fs.writeFile(join(testDir, file), "test");
    }
  });

  afterAll(async () => {
    // テストが終了したら一時ディレクトリを削除します
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it("recursively walks the directory and yields all files and directories", async () => {
    const results = [];
    for await (const elem of walk(testDir)) {
      results.push(elem.path);
    }

    // `walk`関数がすべてのファイルとディレクトリを返すことを確認します
    for (const file of testFiles) {
      expect(results).toContain(join(testDir, file));
    }
  });
});
