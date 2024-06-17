import * as path from "node:path";
import * as fs from "node:fs/promises";

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
