import { getDirectorySize } from "./getDirectorySize";
import { generatePrefix } from "../output/logger";

export const calculateSizeOfNodeModulesDirs = ({
  nodeModulesDirs,
}: {
  nodeModulesDirs: string[];
}) => {
  const entries = [];
  let totalSize = 0;

  process.stdout.write(
    `\r${generatePrefix(
      "info",
    )} Calculating size...`,
  );

  for (const nodeModulesDir of nodeModulesDirs) {
    const dirSize = getDirectorySize(nodeModulesDir);
    totalSize += dirSize;
    entries.push({
      path: nodeModulesDir,
      size: dirSize,
    });
  }

  return {
    entries,
    totalSize,
  };
};
