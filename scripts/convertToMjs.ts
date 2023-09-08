import * as fs from "fs";
import * as path from "path";

const oldFilePath = path.join(__dirname, "..", "dist", "index.js");
const newFilePath = path.join(__dirname, "..", "dist", "index.mjs");

fs.rename(oldFilePath, newFilePath, (err) => {
  if (err !== null && err !== undefined) {
    console.error(`Error renaming file: ${err.message}`);
  } else {
    console.log(`File renamed to ${path.basename(newFilePath)}`);
  }
});
