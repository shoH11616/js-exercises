import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fetchSumOfFileSizes } from "./index.js"; // あなたのモジュールへのパスを適切に置き換えてください

describe("File System functions", () => {
  describe("fetchSumOfFileSizes function", () => {
    it("should return total size of all files in directory", async () => {
      const total = await fetchSumOfFileSizes("./");
      expect(typeof total).toBe("number");
    });
  });
});
