import * as fs from "fs";
import * as path from "path";

import { prompt } from "./utils/prompt";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";
import { generateTable } from "./utils/generateTable";
import { getTotalSizeInBytes } from "./utils/getTotalSizeInBytes";

export async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("❌ Please provide a path, e.g './' for the current folder");
    return;
  }

  const targetDir = path.resolve(args[0]);
  const nodeModulesDirs = await findNodeModulesFolders(targetDir);
  if (nodeModulesDirs.length === 0) {
    console.log("❌ No 'node_modules' folders found.");
    return;
  }

  const totalSizeInBytes = getTotalSizeInBytes(nodeModulesDirs);
  generateTable({ nodeModulesDirs, totalSizeInBytes });

  const answer = await prompt(
    "🙋 Do you want to delete the above folders? (yes/no): ",
  );

  if (answer.toLowerCase() !== "yes" || answer.toLowerCase() !== "y") {
    console.log("👍 No worries, no node_modules folders were deleted!");
    return;
  }

  let deletedFoldersCounter = 0;
  for (const nodeModulesDir of nodeModulesDirs) {
    await fs.promises.rm(nodeModulesDir, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r🗑️  Deleting node_modules folders (${deletedFoldersCounter}/${nodeModulesDirs.length})...`,
    );
  }
  console.log();
  console.log(
    `🤙 All specified node_modules folders have been deleted. Total removed size: ${unitsFormatter(
      totalSizeInBytes,
    )}`,
  );
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
