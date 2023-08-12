import { getDirectorySize } from "./getDirectorySize";

export const getTotalSizeInBytes = (nodeModulesDirs: string[]) => {
  let totalSizeInBytes = 0;
  for (const nodeModulesDir of nodeModulesDirs) {
    const dirSize = getDirectorySize(nodeModulesDir);
    totalSizeInBytes += dirSize;
  }

  return totalSizeInBytes;
};
