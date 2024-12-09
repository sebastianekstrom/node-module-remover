import * as fs from "fs";
import * as path from "path";

export async function findNodeModulesFolders(
  startPath: string,
): Promise<string[]> {
  const results: string[] = [];

  async function findNodeModulesRecursive(dir: string) {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") {
          results.push(path.join(dir, entry.name));
        } else {
          await findNodeModulesRecursive(path.join(dir, entry.name));
        }
      }
    }
  }

  await findNodeModulesRecursive(startPath);
  return results;
}
