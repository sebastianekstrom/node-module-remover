import * as fs from "fs";
import * as path from "path";

export function getDirectorySize(dirPath: string): number {
  let totalSize = 0;

  function calculateSize(directory: string) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        calculateSize(fullPath);
      } else {
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
      }
    }
  }

  try {
    calculateSize(dirPath);
  } catch {
    return 0;
  }

  return totalSize;
}
