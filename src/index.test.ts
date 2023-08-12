import { main } from "./index";

import { prompt } from "./utils/prompt";
import { findNodeModulesFolders } from "./utils/findNodeModulesFolders";
import { getDirectorySize } from "./utils/getDirectorySize";

jest.mock("fs", () => {
  return {
    promises: {
      rm: jest.fn(),
    },
  };
});

jest.mock("./utils/prompt");
jest.mock("./utils/findNodeModulesFolders");
jest.mock("./utils/getDirectorySize");
jest.mock("./utils/generateTable");

describe("main", () => {
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let stdoutSpy: jest.SpyInstance;
  let exitSpy: jest.SpyInstance;

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    stdoutSpy.mockRestore();
    exitSpy.mockRestore();
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    errorSpy = jest.spyOn(console, "error").mockImplementation();
    stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();
    exitSpy = jest.spyOn(process, "exit").mockImplementation();

    // Reset all mock implementations
    (findNodeModulesFolders as jest.Mock).mockReset();
    (getDirectorySize as jest.Mock).mockReset();
    (prompt as jest.Mock).mockReset();
  });

  it("should prompt user for path if no argument provided", async () => {
    process.argv = ["path1", "path2"]; // mimic node and script paths
    await main();
    expect(logSpy).toHaveBeenCalledWith(
      "❌ Please provide a path, e.g './' for the current folder",
    );
  });

  it("should notify if no node_modules are found", async () => {
    process.argv = ["path1", "path2", "./sample"];
    (findNodeModulesFolders as jest.Mock).mockResolvedValue([]);
    await main();
    expect(logSpy).toHaveBeenCalledWith("❌ No 'node_modules' folders found.");
  });
});
