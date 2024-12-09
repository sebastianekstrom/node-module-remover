import * as path from "path";

import { prompt } from "./utils/prompt";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";
import { generateTable } from "./utils/generateTable";
import { calculateSizeOfNodeModulesDirs } from "./utils/calculateSizeOfNodeModulesDirs";
import { deleteFolders } from "./utils/deleteFolders";
import chalk from "chalk";

import { generatePrefix, logger } from "./utils/logger";
import { formatExecutionTime } from "./utils/formatExecutionTime";

const AVAILABLE_ARGS = {
  "--help": "Show help information",
  "--skip-confirmation": "Skip confirmation before deleting folders",
};

const displayHelp = () => {
  console.log("\nUsage: npx node-modules-cleanup@latest <path> [options]\n");
  console.log("Options:");
  for (const [arg, description] of Object.entries(AVAILABLE_ARGS)) {
    console.log(`  ${arg.padEnd(20)} ${description}`);
  }
  console.log("");
};

export async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help")) {
    displayHelp();
    process.exit(0);
  }

  if (args.length < 1) {
    logger({
      prefix: "error",
      message: `Path not provided. Please provide a path, e.g ${chalk.italic(
        "npx node-modules-cleanup@latest ./",
      )} for the current folder`,
    });
    process.exit(0);
  }

  const targetDir = path.resolve(args[0]);

  const nodeModulesDirs = await findNodeModulesFolders(targetDir);
  if (nodeModulesDirs.length === 0) {
    logger({
      prefix: "error",
      message: `No node_modules folders found in the following folder: ${targetDir}`,
    });

    process.exit(0);
  }

  const { entries, totalSize } = calculateSizeOfNodeModulesDirs({
    nodeModulesDirs,
  });

  generateTable({ entries, totalSize });

  const skipConfirmation = args.includes("--skip-confirmation");
  if (!skipConfirmation) {
    const answer = await prompt(
      `${generatePrefix("info")} Do you want to ${chalk.bold.red(
        "delete",
      )} the above folders? ${chalk.italic("(yes/no)")}: `,
    );

    if (
      answer.toLowerCase() !== "yes" &&
      answer.toLowerCase() !== "y" &&
      answer.toLowerCase() !== "kör bara kör!"
    ) {
      logger({
        message:
          "No node_modules folders were deleted. Exiting the cleanup process",
      });
      process.exit(0);
    }
  }

  const startTime = Date.now();

  await deleteFolders(entries);

  console.log("");
  const endTime = Date.now();
  const totalTime = formatExecutionTime(startTime, endTime);

  logger({
    message: "Successfully deleted all specified node_modules folders",
  });

  logger({
    prefix: "none",
    message: ` ${chalk.bold("Cleanup time:")} ${chalk.green(totalTime)}`,
  });

  logger({
    prefix: "none",
    message: ` ${chalk.bold("Folders deleted:")} ${chalk.green(
      entries.length,
    )}`,
  });

  logger({
    prefix: "none",
    message: ` ${chalk.bold("Freed up disk space:")} ${chalk.green(
      unitsFormatter(totalSize),
    )}`,
  });

  process.exit(0);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
