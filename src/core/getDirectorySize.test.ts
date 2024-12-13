// src/core/getDirectorySize.test.ts
import { describe, it, expect, vi } from "vitest";
import { getDirectorySize } from "./getDirectorySize";
import { execSync } from "node:child_process";

vi.mock("node:child_process", () => ({
  execSync: vi.fn(),
}));

describe("getDirectorySize", () => {
  it("should return the correct size in bytes for a given directory", () => {
    (execSync as ReturnType<typeof vi.fn>).mockReturnValue("100\n");

    const dirPath = "/some/directory";
    const expectedSizeInBytes = 100 * 512;

    const size = getDirectorySize(dirPath);

    expect(size).toBe(expectedSizeInBytes);
    expect(execSync).toHaveBeenCalledWith(`du -s "${dirPath}" | cut -f1`);
  });

  it("should return 0 and log an error if execSync throws an error", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (execSync as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error("Command failed");
    });

    const dirPath = "/some/invalid/directory";
    const size = getDirectorySize(dirPath);

    expect(size).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error calculating size for directory ${dirPath}:`,
      expect.any(Error),
    );

    consoleErrorSpy.mockRestore();
  });
});
