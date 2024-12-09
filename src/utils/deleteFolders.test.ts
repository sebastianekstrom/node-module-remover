import fs from "fs";
import { deleteFolders } from "./deleteFolders";
import type { Entry } from "./deleteFolders";

jest.mock("fs", () => {
  const originalFs = jest.requireActual("fs");
  return {
    ...originalFs,
    promises: {
      ...originalFs.promises,
      rm: jest.fn(),
    },
  };
});

const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

beforeEach(() => {
  jest.clearAllMocks();
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
