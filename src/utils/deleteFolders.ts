import * as fs from "fs";

interface Params {
  entries: Array<{
    path: string;
    size: number;
  }>;
}

export const deleteFolders = async ({ entries }: Params) => {
  let deletedFoldersCounter = 0;
  for (const entry of entries) {
    await fs.promises.rm(entry.path, { recursive: true });
    deletedFoldersCounter++;
    process.stdout.write(
      `\r🗑️  Deleting node_modules folders (${deletedFoldersCounter}/${entries.length})...`,
    );
  }
};
