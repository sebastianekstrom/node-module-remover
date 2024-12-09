import Table from "cli-table";
import { unitsFormatter } from "../formatters/unitsFormatter";
import chalk from "chalk";

interface Entry {
  path: string;
  size: number;
}

export const generateTable = ({
  entries,
  totalSize,
}: {
  entries: Entry[];
  totalSize: number;
}) => {
  const table = new Table({
    head: ["Location", "Size"],
    colWidths: [100, 15],
    style: {
      head: ["green", "bold"],
    },
  });

  const sortedEntries = entries.sort((a, b) => b.size - a.size);

  for (const entry of sortedEntries) {
    table.push([entry.path, chalk.bold(`${unitsFormatter(entry.size)}`)]);
  }

  console.log();
  table.push([
    chalk.green.bold("Total size"),
    chalk.green.bold(`${unitsFormatter(totalSize)}`),
  ]);
  console.log(table.toString());
};
