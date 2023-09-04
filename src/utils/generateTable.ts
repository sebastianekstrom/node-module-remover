import Table from "cli-table";
import { unitsFormatter } from "./unitsFormatter";

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
    head: ["Path", "Size"],
    colWidths: [100, 15],
    style: {
      head: ["green", "bold"],
    },
  });

  for (const entry of entries) {
    table.push([entry.path, `${unitsFormatter(entry.size)}`]);
  }

  console.log();
  table.push(["Total size", `${unitsFormatter(totalSize)}`]);
  console.log(table.toString());
};
