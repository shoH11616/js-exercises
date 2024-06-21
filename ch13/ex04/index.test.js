import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fetchFirstFileSize, fetchSumOfFileSizes } from "./index.js";

describe("File System functions", () => {
  describe("fetchFirstFileSize function", () => {
    it("should return size of first file when directory is not empty", async () => {
      // ディレクトリが空でない場合にfetchFirstFileSize関数が最初のファイルのサイズを返す
      const size = await fetchFirstFileSize("./");
      expect(typeof size).toBe("number");
    });

    it("should return null when directory is empty", async () => {
      // ディレクトリが空でない場合はnullを返す
      const size = await fetchFirstFileSize("./emptyDirectory");
      expect(size).toBeNull();
    });
  });

  describe("fetchSumOfFileSizes function", () => {
    it("should return total size of all files in directory", async () => {
      // fetchSumOfFileSizes関数がディレクトリ内のすべてのファイルの合計サイズを返す
      const total = await fetchSumOfFileSizes("./");
      expect(typeof total).toBe("number");
    });
  });
});
