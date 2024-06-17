import * as path from "node:path";
import * as fs from "node:fs/promises";

/**
 * Fetches the size of the first file in a directory.
 *
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<number|null>} - A promise that resolves to the size of the first file, or null if the directory is empty.
 */
export function fetchFirstFileSize(dirPath) {
  return fs.readdir(dirPath).then((files) => {
    if (files.length === 0) {
      return null;
    }
    return fs.stat(path.join(dirPath, files[0])).then((stats) => stats.size);
  });
}

/**
 * Fetches the sum of the sizes of all files in a directory.
 *
 * @param {string} dirPath - The path to the directory.
 * @returns {Promise<number>} - A promise that resolves to the total size of all files.
 */
export function fetchSumOfFileSizes(dirPath) {
  return fs.readdir(dirPath).then((files) => {
    const promises = files.map((file) =>
      fs.stat(path.join(dirPath, file)).then((stats) => stats.size)
    );
    return Promise.all(promises).then((sizes) =>
      sizes.reduce((a, b) => a + b, 0)
    );
  });
}
