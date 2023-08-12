import * as fs from "fs";
import * as path from "path";
import Table from "cli-table";

import { prompt } from "./utils/prompt";
import { getDirectorySize } from "./utils/getDirectorySize";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log("🛑 Please provide a path, e.g './' for the current folder");
    return;
  }

  const targetDir = path.resolve(args[0]);
  const nodeModulesDirs = await findNodeModulesFolders(targetDir);
  if (nodeModulesDirs.length === 0) {
    console.log("🛑 No 'node_modules' folders found.");
    return;
  }

  const table = new Table({
    head: ["Path", "Size"],
    colWidths: [100, 15],
  });

  let totalSizeInBytes = 0;
  let counter = 0;

  for (const nodeModulesDir of nodeModulesDirs) {
    counter++;
    const dirSize = getDirectorySize(nodeModulesDir);
    totalSizeInBytes += dirSize;
    process.stdout.write(
      `\r🕵🏻  Locating node_modules folders (found ${counter})...`,
    );
    table.push([nodeModulesDir, `${unitsFormatter(dirSize)}`]);
  }

  console.log();
  table.push(["Total size", `${unitsFormatter(totalSizeInBytes)}`]);
  console.log(table.toString());

  const answer = await prompt(
    "🙋 Do you want to delete the above folders? (yes/no): ",
  );
  if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
    let deletedCounter = 0;
    for (const nodeModulesDir of nodeModulesDirs) {
      await fs.promises.rm(nodeModulesDir, { recursive: true });
      deletedCounter++;
      process.stdout.write(
        `\r🗑️  Deleting node_modules folders (${deletedCounter}/${nodeModulesDirs.length})...`,
      );
    }
    console.log();
    console.log(
      `🤙 All specified node_modules folders have been deleted. Total removed size: ${unitsFormatter(
        totalSizeInBytes,
      )}`,
    );
    return;
  }
  console.log("👎 No worries, no node_modules folders were deleted!");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
