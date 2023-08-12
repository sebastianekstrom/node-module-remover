import { generateTable } from "./generateTable";
import { getDirectorySize } from "./getDirectorySize";
import { unitsFormatter } from "./unitsFormatter";

jest.mock("./getDirectorySize");
jest.mock("./unitsFormatter");

describe("generateTable", () => {
  let logSpy: jest.SpyInstance;
  let stdoutSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation();
    stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();

    (getDirectorySize as jest.Mock).mockReturnValue(100);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    (unitsFormatter as jest.Mock).mockImplementation((bytes) => `${bytes}B`);
  });

  afterEach(() => {
    logSpy.mockRestore();
    stdoutSpy.mockRestore();
  });

  it("should generate a table and print it", () => {
    generateTable({
      nodeModulesDirs: ["/path/to/node_modules1", "/path/to/node_modules2"],
      totalSizeInBytes: 200,
    });

    expect(stdoutSpy).toHaveBeenCalledTimes(2);

    expect(logSpy).toHaveBeenLastCalledWith(
      expect.stringContaining("Total size"),
    );
    expect(logSpy).toHaveBeenLastCalledWith(expect.stringContaining("200B"));
  });
});
