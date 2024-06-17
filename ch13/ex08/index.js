import * as path from "node:path";
import * as fs from "node:fs/promises";

export async function fetchFirstFileSize(dirPath) {
  const files = await fs.readdir(dirPath);
  if (files.length === 0) {
    return null;
  }
  const stats = await fs.stat(path.join(dirPath, files[0]));
  return stats.size;
}

export async function fetchSumOfFileSizes(dirPath) {
  const files = await fs.readdir(dirPath);
  let total = 0;
  for (const file of files) {
    const stats = await fs.stat(path.join(dirPath, file));
    total += stats.size;
  }
  return total;
}
