import * as fs from "fs";
import * as path from "path";
import { generatePrefix } from "../output/logger";

export async function findNodeModulesFolders(
  startPath: string,
): Promise<string[]> {
  const results: string[] = [];
  let foldersSearched = 0;
  let nodeModulesFound = 0;

  async function findNodeModulesRecursive(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        foldersSearched++;

        process.stdout.write(
          `\r${generatePrefix("info")} Folders searched: ${foldersSearched} (${nodeModulesFound} node_modules found)...`,
        );

        if (entry.name === "node_modules") {
          const nodeModulesPath = path.join(dir, entry.name);
          const nodeModulesEntries = await fs.promises.readdir(nodeModulesPath);

          if (nodeModulesEntries.length > 0) {
            results.push(nodeModulesPath);
            nodeModulesFound++;
          }
        } else {
          await findNodeModulesRecursive(path.join(dir, entry.name));
        }
      }
    }
  }

  await findNodeModulesRecursive(startPath);
  console.log();
  return results;
}
