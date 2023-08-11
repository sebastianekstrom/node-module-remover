var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import * as path from "path";
import Table from "cli-table";
import { prompt } from "./utils/prompt";
import { getDirectorySize } from "./utils/getDirectorySize";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { unitsFormatter } from "./utils/unitsFormatter";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv.slice(2);
        if (args.length < 1) {
            console.log("🛑 Please provide a path.");
            return;
        }
        const targetDir = path.resolve(args[0]);
        const nodeModulesDirs = yield findNodeModulesFolders(targetDir);
        if (nodeModulesDirs.length === 0) {
            console.log("No 'node_modules' folders found.");
            return;
        }
        const table = new Table({
            head: ["Path", "Size"],
            colWidths: [80, 15],
        });
        let totalSizeInBytes = 0;
        let counter = 0;
        for (const nodeModulesDir of nodeModulesDirs) {
            counter++;
            const dirSize = getDirectorySize(nodeModulesDir);
            totalSizeInBytes += dirSize;
            process.stdout.write(`\rLocating node_modules folders (found ${counter})...`);
            table.push([nodeModulesDir, `${unitsFormatter(dirSize)}`]);
        }
        console.log();
        table.push(["Total size", `${unitsFormatter(totalSizeInBytes)}`]);
        console.log(table.toString());
        const answer = yield prompt("Do you want to delete the above folders? (yes/no): ");
        if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
            for (const nodeModulesDir of nodeModulesDirs) {
                yield fs.promises.rm(nodeModulesDir, { recursive: true });
            }
            console.log("All specified node_modules folders have been deleted. Total removed size: " +
                unitsFormatter(totalSizeInBytes));
            return;
        }
        console.log("No node_modules folders were deleted.");
    });
}
main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map