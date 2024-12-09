import * as fs from "fs";
import { generatePrefix } from "../output/logger";

export interface Entry {
  path: string;
  size: number;
}

export const deleteFolders = async (entries: Entry[]) => {
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.promises.rm(entry.path, { recursive: true });
    deletedFoldersCounter++;
    const message = `\r${generatePrefix(
      "info",
    )} Deleting node_modules folders (${deletedFoldersCounter}/${
      entries.length
    })...`;
    process.stdout.write(message);
  }
};
