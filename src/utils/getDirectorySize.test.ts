import { getDirectorySize } from "./getDirectorySize";
import { execSync } from "node:child_process";

jest.mock("node:child_process", () => ({
  execSync: jest.fn(),
}));

describe("getDirectorySize", () => {
  it("should return correct size in bytes", () => {
    (execSync as jest.Mock).mockReturnValue(Buffer.from("1000"));

    const result = getDirectorySize("some-path");
    expect(result).toBe(512000);
  });

  it("should return 0 and log error for invalid dir", () => {
    (execSync as jest.Mock).mockImplementation(() => {
      throw new Error("some error");
    });

    console.error = jest.fn();
    const result = getDirectorySize("some-invalid-path");
    expect(result).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("some-invalid-path"),
      expect.any(Error),
    );
  });
});
