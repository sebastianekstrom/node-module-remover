import { execSync } from "node:child_process";

export function getDirectorySize(dirPath: string): number {
  try {
    const sizeInBlocks = Number.parseInt(
      execSync(`du -s "${dirPath}" | cut -f1`).toString().trim(),
      10,
    );

    const sizeInBytes = sizeInBlocks * 512;
    return sizeInBytes;
  } catch (err) {
    console.error(`Error calculating size for directory ${dirPath}:`, err);
    return 0;
  }
}
