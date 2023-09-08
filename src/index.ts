import * as fs from "fs";
import * as path from "path";

import { prompt } from "./utils/prompt";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";
import { generateTable } from "./utils/generateTable";
import { calculateSizeOfNodeModulesDirs } from "./utils/calculateSizeOfNodeModulesDirs";

export async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("❌ Please provide a path. E.g './' for the current folder");
    return;
  }

  const targetDir = path.resolve(args[0]);
  const nodeModulesDirs = await findNodeModulesFolders(targetDir);
  if (nodeModulesDirs.length === 0) {
    console.log("❌ No 'node_modules' folders found.");
    return;
  }

  const { entries, totalSize } = calculateSizeOfNodeModulesDirs({
    nodeModulesDirs,
  });

  generateTable({ entries, totalSize });

  const answer = await prompt(
    "🙋 Do you want to delete the above folders? (yes/no): ",
  );

  if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
    console.log("👍 No worries, no node_modules folders were deleted!");
    return;
  }

  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.promises.rm(entry.path, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r🗑️  Deleting node_modules folders (${deletedFoldersCounter}/${entries.length})...`,
    );
  }
  console.log();
  console.log(
    `🤙 All specified node_modules folders have been deleted. Total removed size: ${unitsFormatter(
      totalSize,
    )}`,
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
