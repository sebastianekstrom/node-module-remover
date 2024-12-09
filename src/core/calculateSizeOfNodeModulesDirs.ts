import { getDirectorySize } from "./getDirectorySize";
import { generatePrefix } from "../output/logger";

export const calculateSizeOfNodeModulesDirs = ({
  nodeModulesDirs,
}: {
  nodeModulesDirs: string[];
}) => {
  let counter = 0;
  const entries = [];
  let totalSize = 0;

  for (const nodeModulesDir of nodeModulesDirs) {
    counter++;
    const dirSize = getDirectorySize(nodeModulesDir);
    totalSize += dirSize;
    entries.push({
      path: nodeModulesDir,
      size: dirSize,
    });
    process.stdout.write(
      `\r${generatePrefix(
        "info",
      )} Locating node_modules folders (found ${counter})...`,
    );
  }

  return {
    entries,
    totalSize,
  };
};
