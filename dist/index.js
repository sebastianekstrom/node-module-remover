var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
import * as path from 'path';
import Table from 'cli-table';
import readline from 'readline';
function findNodeModulesDirectories(startPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = [];
        function findNodeModulesRecursive(dir) {
            return __awaiter(this, void 0, void 0, function* () {
                const entries = yield fs.promises.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    if (entry.isDirectory()) {
                        if (entry.name === 'node_modules') {
                            results.push(path.join(dir, entry.name));
                        }
                        else {
                            yield findNodeModulesRecursive(path.join(dir, entry.name));
                        }
                    }
                }
            });
        }
        yield findNodeModulesRecursive(startPath);
        return results;
    });
}
function getDirectorySize(dirPath) {
    let totalSize = 0;
    if (!fs.existsSync(dirPath)) {
        return 0;
    }
    fs.readdirSync(dirPath).forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.existsSync(filePath)) {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                totalSize += getDirectorySize(filePath);
            }
            else {
                totalSize += stats.size;
            }
        }
    });
    return totalSize;
}
function bytesToMegabytes(bytes) {
    return bytes / (1024 * 1024);
}
function prompt(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = process.argv.slice(2);
        if (args.length < 1) {
            console.log('🛑 Please provide a path.');
            return;
        }
        const targetDir = path.resolve(args[0]);
        const nodeModulesDirs = yield findNodeModulesDirectories(targetDir);
        if (nodeModulesDirs.length === 0) {
            console.log("No 'node_modules' directories found.");
            return;
        }
        const table = new Table({
            head: ['Path', 'Size'],
            colWidths: [80, 15]
        });
        let totalSizeInBytes = 0;
        let counter = 0;
        for (const nodeModulesDir of nodeModulesDirs) {
            counter++;
            const dirSize = getDirectorySize(nodeModulesDir);
            totalSizeInBytes += dirSize;
            process.stdout.write(`\rLocating node_modules directories (found ${counter})...`);
            table.push([nodeModulesDir, `${bytesToMegabytes(dirSize).toFixed(2)}MB`]);
        }
        console.log();
        table.push(['Total size', `${bytesToMegabytes(totalSizeInBytes).toFixed(2)}MB`]);
        console.log(table.toString());
        const answer = yield prompt("Do you want to delete the above directories? (yes/no): ");
        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
            for (const nodeModulesDir of nodeModulesDirs) {
                yield fs.promises.rm(nodeModulesDir, { recursive: true });
            }
            console.log('All specified node_modules directories have been deleted. Total removed size: ' + bytesToMegabytes(totalSizeInBytes).toFixed(2) + ' MB');
        }
        else {
            console.log('No node_modules directories were deleted.');
        }
    });
}
main();
//# sourceMappingURL=index.js.map