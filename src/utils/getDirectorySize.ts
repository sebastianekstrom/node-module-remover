import * as fs from "fs";
import * as path from "path";

export function getDirectorySize(dirPath: string): number {
  let totalSize = 0;

  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    }
  });

  return totalSize;
}
