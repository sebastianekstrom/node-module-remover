import { deleteFolders } from "./deleteFolders";
import type { Entry } from "./deleteFolders";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fs, vol } from "memfs";

vi.mock("node:fs");
vi.mock("node:fs/promises");

const stdoutSpy = vi
  .spyOn(process.stdout, "write")
  .mockImplementation(() => true);

beforeEach(() => {
  vi.clearAllMocks();
  vol.reset();
  vol.fromJSON({
    path1: null,
    path2: null,
  });

  vi.spyOn(fs.promises, "rm").mockResolvedValue();
});

describe("deleteFolders", () => {
  it("should delete folders and update counter", async () => {
    const mockEntries: Entry[] = [
      { path: "path1", size: 100 },
      { path: "path2", size: 200 },
    ];

    await deleteFolders(mockEntries);

    expect(fs.promises.rm).toHaveBeenCalledTimes(2);
    expect(fs.promises.rm).toHaveBeenCalledWith("path1", { recursive: true });
    expect(fs.promises.rm).toHaveBeenCalledWith("path2", { recursive: true });
    expect(stdoutSpy).toHaveBeenCalledWith(
      "\r◉ Deleting node_modules folders (2/2)...",
    );
  });
});
