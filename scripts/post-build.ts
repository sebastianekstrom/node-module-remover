import * as fs from "node:fs";
import * as path from "node:path";

const oldFilePath = path.join(__dirname, "..", "dist", "index.js");
const newFilePath = path.join(__dirname, "..", "dist", "index.mjs");

fs.rename(oldFilePath, newFilePath, (err) => {
  if (err !== null && err !== undefined) {
    console.error(`Error renaming file: ${err.message}`);
    return;
  }

  fs.readFile(newFilePath, "utf8", (readErr, data) => {
    if (readErr !== null && readErr !== undefined) {
      console.error(`Error reading file: ${readErr.message}`);
      return;
    }

    const shebang = "#!/usr/bin/env node\n";
    const updatedContent = shebang + data;

    fs.writeFile(newFilePath, updatedContent, "utf8", (writeErr) => {
      if (writeErr !== null && writeErr !== undefined) {
        console.error(`Error writing to file: ${writeErr.message}`);
      } else {
        console.log(
          `File renamed to ${path.basename(newFilePath)} and shebang added.`,
        );
      }
    });
  });
});
