"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompt = void 0;
const readline_1 = __importDefault(require("readline"));
async function prompt(question) {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return await new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}
exports.prompt = prompt;
//# sourceMappingURL=prompt.js.map