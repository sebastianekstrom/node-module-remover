import { describe, it, expect, beforeAll, afterAll, spyOn } from "bun:test";

import { findNodeModulesFolders } from "./findNodeModulesFolders";
import * as fs from "fs";

describe("findNodeModulesFolders", () => {
  let readdirSpy: jest.SpyInstance;

  beforeAll(() => {
    readdirSpy = spyOn(fs.promises, "readdir").mockImplementation(
      // @ts-expect-error Weird things going on in here
      async (dir: string) => {
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
      },
    );
  });

  it("should find all node_modules folders recursively", async () => {
    const result = await findNodeModulesFolders("/start");
    expect(result).toEqual([
      "/start/project1/node_modules",
      "/start/project2/node_modules",
    ]);
  });

  afterAll(() => {
    readdirSpy.mockRestore();
  });
});
