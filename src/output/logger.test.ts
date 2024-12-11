import chalk from "chalk";
import { generatePrefix, logger } from "./logger";

jest.mock("chalk", () => {
  const mock = jest.fn((text) => text) as jest.Mock & {
    green: jest.Mock;
    red: jest.Mock;
    blue: jest.Mock;
  };
  mock.green = mock;
  mock.red = mock;
  mock.blue = mock;
  return mock;
});

describe("generatePrefix", () => {
  it("should return green circle for 'default' prefix", () => {
    const result = generatePrefix("default");
    expect(result).toBe(chalk.green("◉"));
  });

  it("should return red circle for 'error' prefix", () => {
    const result = generatePrefix("error");
    expect(result).toBe(chalk.red("◉"));
  });

  it("should return blue circle for 'info' prefix", () => {
    const result = generatePrefix("info");
    expect(result).toBe(chalk.blue("◉"));
  });

  it("should return empty string for 'none' prefix", () => {
    const result = generatePrefix("none");
    expect(result).toBe("");
  });

  it("should return green circle for undefined prefix", () => {
    const result = generatePrefix();
    expect(result).toBe(chalk.green("◉"));
  });
});

describe("logger", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should log message with default prefix", () => {
    logger({ message: "Test message" });
    expect(consoleSpy).toHaveBeenCalledWith(`${chalk.green("◉")} Test message`);
  });

  it("should log message with error prefix", () => {
    logger({ message: "Error occurred", prefix: "error" });
    expect(consoleSpy).toHaveBeenCalledWith(`${chalk.red("◉")} Error occurred`);
  });

  it("should log message with info prefix", () => {
    logger({ message: "Information", prefix: "info" });
    expect(consoleSpy).toHaveBeenCalledWith(`${chalk.blue("◉")} Information`);
  });

  it("should log message without prefix", () => {
    logger({ message: "No prefix", prefix: "none" });
    expect(consoleSpy).toHaveBeenCalledWith(` No prefix`);
  });
});
