import { findNodeModulesFolders } from "./findNodeModulesFolders";
import * as fs from "node:fs";

jest.mock("fs", () => ({
  promises: {
    readdir: jest.fn(),
  },
}));

describe("findNodeModulesFolders", () => {
  it("should find all node_modules folders recursively", async () => {
    (fs.promises.readdir as jest.Mock).mockImplementation(async (dir) => {
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

    const result = await findNodeModulesFolders("/start");
    expect(result).toEqual([
      "/start/project1/node_modules",
      "/start/project2/node_modules",
    ]);
  });
});
