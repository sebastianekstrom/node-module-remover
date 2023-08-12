"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cli_table_1 = __importDefault(require("cli-table"));
const prompt_1 = require("./utils/prompt");
const getDirectorySize_1 = require("./utils/getDirectorySize");
const findNodeModulesFolders_1 = require("./utils/findNodeModulesFolders");
const unitsFormatter_1 = require("./utils/unitsFormatter");
async function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.log("🛑 Please provide a path, e.g './' for the current folder");
        return;
    }
    const targetDir = path.resolve(args[0]);
    const nodeModulesDirs = await (0, findNodeModulesFolders_1.findNodeModulesFolders)(targetDir);
    if (nodeModulesDirs.length === 0) {
        console.log("🛑 No 'node_modules' folders found.");
        return;
    }
    const table = new cli_table_1.default({
        head: ["Path", "Size"],
        colWidths: [100, 15],
    });
    let totalSizeInBytes = 0;
    let counter = 0;
    for (const nodeModulesDir of nodeModulesDirs) {
        counter++;
        const dirSize = (0, getDirectorySize_1.getDirectorySize)(nodeModulesDir);
        totalSizeInBytes += dirSize;
        process.stdout.write(`\r🕵🏻  Locating node_modules folders (found ${counter})...`);
        table.push([nodeModulesDir, `${(0, unitsFormatter_1.unitsFormatter)(dirSize)}`]);
    }
    console.log();
    table.push(["Total size", `${(0, unitsFormatter_1.unitsFormatter)(totalSizeInBytes)}`]);
    console.log(table.toString());
    const answer = await (0, prompt_1.prompt)("🙋 Do you want to delete the above folders? (yes/no): ");
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
        for (const nodeModulesDir of nodeModulesDirs) {
            await fs.promises.rm(nodeModulesDir, { recursive: true });
        }
        console.log("🤙 All specified node_modules folders have been deleted. Total removed size: " +
            (0, unitsFormatter_1.unitsFormatter)(totalSizeInBytes));
        return;
    }
    console.log("👎 No worries, no node_modules folders were deleted!");
}
main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map