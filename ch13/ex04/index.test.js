import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js"; // あなたのモジュールへのパスを適切に置き換えてください

describe("File System functions", () => {
  describe("fetchFirstFileSize function", () => {
    it("should return size of first file when directory is not empty", async () => {
      const size = await fetchFirstFileSize("./");
      expect(typeof size).toBe("number");
    });

    it("should return null when directory is empty", async () => {
      // ここで空のディレクトリへのパスを指定してください
      const size = await fetchFirstFileSize("./emptyDirectory");
      expect(size).toBeNull();
    });
  });

  describe("fetchSumOfFileSizes function", () => {
    it("should return total size of all files in directory", async () => {
      const total = await fetchSumOfFileSizes("./");
      expect(typeof total).toBe("number");
    });
  });
});
