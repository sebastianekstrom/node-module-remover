import { main } from "./index";
import { prompt } from "./output/prompt";
import { findNodeModulesFolders } from "./core/findNodeModulesFolders";
import { calculateSizeOfNodeModulesDirs } from "./core/calculateSizeOfNodeModulesDirs";
import { deleteFolders } from "./core/deleteFolders";
import { logger } from "./output/logger";

jest.mock("./output/prompt");
jest.mock("./core/findNodeModulesFolders");
jest.mock("./core/calculateSizeOfNodeModulesDirs");
jest.mock("./core/deleteFolders");
jest.mock("./output/logger");

describe("main", () => {
  let logSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`process.exit: ${code as number}`);
    });
  });

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    process.argv = ["node", "script.js"];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("args", () => {
    it("should display help and exit when --help is passed", async () => {
      process.argv.push("--help");
      await expect(main()).rejects.toThrow("process.exit: 0");
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Usage:"));
    });

    it("should display version and exit when --version is passed", async () => {
      process.argv.push("--version");
      await expect(main()).rejects.toThrow("process.exit: 0");
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Version:"));
    });

    it("should skip confirmation if --skip-confirmation is passed", async () => {
      process.argv.push("./some/path", "--skip-confirmation");
      (findNodeModulesFolders as jest.Mock).mockResolvedValue([
        "/path/to/node_modules",
      ]);
      (calculateSizeOfNodeModulesDirs as jest.Mock).mockReturnValue({
        entries: [{ path: "/path/to/node_modules", size: 100 }],
        totalSize: 100,
      });

      await expect(main()).rejects.toThrow("process.exit: 0");
      expect(prompt).not.toHaveBeenCalled();
      expect(deleteFolders).toHaveBeenCalledWith([
        { path: "/path/to/node_modules", size: 100 },
      ]);
    });
  });

  it("should log error and exit when no path is provided", async () => {
    await expect(main()).rejects.toThrow("process.exit: 0");
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        prefix: "error",
        message: expect.stringContaining("Path not provided"),
      }),
    );
  });

  it("should log error and exit when no node_modules folders are found", async () => {
    process.argv.push("./some/path");
    (findNodeModulesFolders as jest.Mock).mockResolvedValue([]);
    await expect(main()).rejects.toThrow("process.exit: 0");
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        prefix: "error",
        message: expect.stringContaining("No node_modules folders found"),
      }),
    );
  });

  it("should prompt for confirmation and delete folders", async () => {
    process.argv.push("./some/path");
    (findNodeModulesFolders as jest.Mock).mockResolvedValue([
      "/path/to/node_modules",
    ]);
    (calculateSizeOfNodeModulesDirs as jest.Mock).mockReturnValue({
      entries: [{ path: "/path/to/node_modules", size: 100 }],
      totalSize: 100,
    });
    (prompt as jest.Mock).mockResolvedValue("yes");

    await expect(main()).rejects.toThrow("process.exit: 0");
    expect(prompt).toHaveBeenCalled();
    expect(deleteFolders).toHaveBeenCalledWith([
      { path: "/path/to/node_modules", size: 100 },
    ]);
  });

  it("should log a message and exit if user declines deletion", async () => {
    process.argv.push("./some/path");
    (findNodeModulesFolders as jest.Mock).mockResolvedValue([
      "/path/to/node_modules",
    ]);
    (calculateSizeOfNodeModulesDirs as jest.Mock).mockReturnValue({
      entries: [{ path: "/path/to/node_modules", size: 100 }],
      totalSize: 100,
    });
    (prompt as jest.Mock).mockResolvedValue("no");

    await expect(main()).rejects.toThrow("process.exit: 0");
    expect(prompt).toHaveBeenCalled();
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          "No node_modules folders were deleted. Exiting the cleanup process",
      }),
    );
  });
});
