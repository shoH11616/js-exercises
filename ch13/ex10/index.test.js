import * as path from "node:path";
import * as fs from "node:fs/promises";
import { fetchSumOfFileSizes } from "./index.js";

describe("File System functions", () => {
  describe("fetchSumOfFileSizes function", () => {
    it("should return total size of all files in directory", async () => {
      const total = await fetchSumOfFileSizes("./");
      expect(typeof total).toBe("number");
    });
  });
});
