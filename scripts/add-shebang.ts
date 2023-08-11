import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "..", "src/index.js");
const data = fs.readFileSync(filePath, "utf8");
const withShebang = "#!/usr/bin/env node\n" + data;

fs.writeFileSync(filePath, withShebang, "utf8");
