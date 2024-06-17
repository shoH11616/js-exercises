import * as fs from "node:fs";
import { readdir, stat } from "./index.js"; // あなたのモジュールへのパスを適切に置き換えてください

describe("File System functions", () => {
  describe("readdir function", () => {
    it("should return files in directory when path is valid", async () => {
      const files = await readdir("./");
      expect(Array.isArray(files)).toBe(true);
    });

    it("should throw error when path is invalid", async () => {
      await expect(readdir("./invalidPath")).rejects.toThrow();
    });
  });

  describe("stat function", () => {
    it("should return stats object when path is valid", async () => {
      const stats = await stat("./index.js"); // あなたのモジュールへのパスを適切に置き換えてください
      expect(stats.isFile()).toBe(true);
    });

    it("should throw error when path is invalid", async () => {
      await expect(stat("./invalidPath")).rejects.toThrow();
    });
  });
});
