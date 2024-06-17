import { promises as fs } from "fs";
import { join } from "path";

export async function* walk(rootPath) {
  const files = await fs.readdir(rootPath);

  for (const file of files) {
    const filePath = join(rootPath, file);
    const stats = await fs.stat(filePath);

    yield {
      path: filePath,
      isDirectory: stats.isDirectory(),
    };

    if (stats.isDirectory()) {
      yield* walk(filePath);
    }
  }
}
