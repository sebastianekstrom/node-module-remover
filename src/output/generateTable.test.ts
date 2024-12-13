import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateTable } from "./generateTable";
import { unitsFormatter } from "../formatters/unitsFormatter";

vi.mock("../formatters/unitsFormatter");
vi.mock("chalk", () => {
  const createChainedMock = () => {
    const mock = vi.fn((text) => text) as any;
    mock.green = mock;
    mock.bold = mock;
    return mock;
  };
  return { default: createChainedMock() };
});

describe("generateTable", () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    (unitsFormatter as ReturnType<typeof vi.fn>).mockImplementation(
      (bytes: number) => `${bytes}B`,
    );
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should generate a table and print it", () => {
    generateTable({
      entries: [
        { path: "/path/to/node_modules1", size: 100 },
        { path: "/path/to/node_modules2", size: 200 },
      ],
      totalSize: 300,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Total size"),
    );
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("200B"));
  });
});
