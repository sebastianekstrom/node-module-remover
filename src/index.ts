import { intro, outro, confirm, isCancel, cancel, text } from "@clack/prompts";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";
import { generateTable } from "./utils/generateTable";
import { calculateSizeOfNodeModulesDirs } from "./utils/calculateSizeOfNodeModulesDirs";
import { deleteFolders } from "./utils/deleteFolders";
import { setTimeout as sleep } from "node:timers/promises";

export async function main() {
  console.log();
  intro("🗑️ node-modules-cleanup");

  const targetDir = await text({
    message: "Where should I look for node_modules folders?",
    placeholder: "./",
  });

  if (isCancel(targetDir)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  const nodeModulesDirs = await findNodeModulesFolders(targetDir);
  if (nodeModulesDirs.length === 0) {
    cancel("❌ No 'node_modules' folders found.");
    return process.exit(0);
  }

  const { entries, totalSize } = calculateSizeOfNodeModulesDirs({
    nodeModulesDirs,
  });

  generateTable({ entries, totalSize });

  const shouldContinue = await confirm({
    message: "Do you want to delete these folders?",
  });

  if (isCancel(shouldContinue) || !shouldContinue) {
    cancel("Got it! No node_modules folders removed");
    return process.exit(0);
  }

  await deleteFolders(entries);

  outro(
    `🤙 All specified node_modules folders have been deleted. Total removed size: ${unitsFormatter(
      totalSize,
    )}`,
  );
  await sleep(1000);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
