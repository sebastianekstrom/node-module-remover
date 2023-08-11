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
export function findNodeModulesFolders(startPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = [];
        function findNodeModulesRecursive(dir) {
            return __awaiter(this, void 0, void 0, function* () {
                const entries = yield fs.promises.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    if (entry.isDirectory()) {
                        if (entry.name === "node_modules") {
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
//# sourceMappingURL=findNodeModulesFolders.js.map