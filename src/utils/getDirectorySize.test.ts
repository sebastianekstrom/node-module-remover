import { getDirectorySize } from "./getDirectorySize";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

interface FileStructure {
  [key: string]: number | FileStructure;
}

describe("getDirectorySize", () => {
  let testDir: string;

  const setupTestFiles = (structure: FileStructure, currentPath: string) => {
    Object.keys(structure).forEach((key) => {
      const newPath = path.join(currentPath, key);
      const value = structure[key];

      if (typeof value === "number") {
        fs.writeFileSync(newPath, new Array(value + 1).join("a"));
      } else {
        fs.mkdirSync(newPath);
        setupTestFiles(value, newPath);
      }
    });
  };

  beforeEach(() => {
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), "jest-"));
  });

  afterEach(() => {
    fs.rmdirSync(testDir, { recursive: true });
  });

  it("should correctly calculate the directory size", () => {
    const testFilesStructure = {
      dir1: {
        file1: 10,
        file2: 20,
        dir2: {
          file3: 30,
        },
      },
      dir3: {
        file4: 40,
      },
    };

    setupTestFiles(testFilesStructure, testDir);

    const totalSize = getDirectorySize(testDir);

    expect(totalSize).toBe(100);
  });

  it("should return 0 for non-existent directory", () => {
    const nonExistentDir = path.join(testDir, "nonexistent");
    const size = getDirectorySize(nonExistentDir);
    expect(size).toBe(0);
  });
});
