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
Object.defineProperty(exports, "__esModule", { value: true });
const findNodeModulesFolders_1 = require("./findNodeModulesFolders");
const fs = __importStar(require("fs"));
jest.mock("fs", () => ({
    promises: {
        readdir: jest.fn(),
    },
}));
describe("findNodeModulesFolders", () => {
    it("should find all node_modules folders recursively", async () => {
        fs.promises.readdir.mockImplementation(async (dir) => {
            switch (dir) {
                case "/start":
                    return [
                        { name: "project1", isDirectory: () => true },
                        { name: "project2", isDirectory: () => true },
                        { name: "file.txt", isDirectory: () => false },
                    ];
                case "/start/project1":
                    return [
                        { name: "node_modules", isDirectory: () => true },
                        { name: "src", isDirectory: () => true },
                    ];
                case "/start/project1/src":
                    return [];
                case "/start/project2":
                    return [{ name: "node_modules", isDirectory: () => true }];
                default:
                    return [];
            }
        });
        const result = await (0, findNodeModulesFolders_1.findNodeModulesFolders)("/start");
        expect(result).toEqual([
            "/start/project1/node_modules",
            "/start/project2/node_modules",
        ]);
    });
});
//# sourceMappingURL=findNodeModulesFolders.test.js.map