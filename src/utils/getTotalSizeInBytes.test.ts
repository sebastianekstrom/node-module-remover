import { getDirectorySize } from "./getDirectorySize";
import { getTotalSizeInBytes } from "./getTotalSizeInBytes";

jest.mock("./getDirectorySize");

describe("getTotalSizeInBytes", () => {
  beforeEach(() => {
    (getDirectorySize as jest.Mock).mockReset();
  });

  it("should correctly sum up directory sizes", () => {
    (getDirectorySize as jest.Mock)
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(150);

    const dirs = ["dir1", "dir2"];
    const totalSize = getTotalSizeInBytes(dirs);
    expect(totalSize).toBe(200);
  });

  it("should return 0 when given an empty array", () => {
    expect(getTotalSizeInBytes([])).toBe(0);
  });

  it("should handle directories with size 0", () => {
    (getDirectorySize as jest.Mock).mockReturnValue(0);

    const dirs = ["emptyDir1", "emptyDir2"];
    const totalSize = getTotalSizeInBytes(dirs);
    expect(totalSize).toBe(0);
  });
});
