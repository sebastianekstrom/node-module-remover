import Table from "cli-table";
import { unitsFormatter } from "./unitsFormatter";
import { getDirectorySize } from "./getDirectorySize";

export const generateTable = ({
  nodeModulesDirs,
  totalSizeInBytes,
}: {
  nodeModulesDirs: string[];
  totalSizeInBytes: number;
}) => {
  const table = new Table({
    head: ["Path", "Size"],
    colWidths: [100, 15],
    style: {
      head: ["green", "bold"],
    },
  });

  let counter = 0;

  for (const nodeModulesDir of nodeModulesDirs) {
    counter++;
    const dirSize = getDirectorySize(nodeModulesDir);
    process.stdout.write(
      `\r🕵🏻  Locating node_modules folders (found ${counter})...`,
    );
    table.push([nodeModulesDir, `${unitsFormatter(dirSize)}`]);
  }

  console.log();
  table.push(["Total size", `${unitsFormatter(totalSizeInBytes)}`]);
  console.log(table.toString());
};
