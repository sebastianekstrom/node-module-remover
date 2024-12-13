import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import chalk from "chalk";
import { generatePrefix, logger } from "./logger";

vi.mock("chalk", () => {
  const createChainedMock = () => {
    const mock = vi.fn((text) => text) as any;
    mock.red = mock;
    mock.green = mock;
    mock.blue = mock;
    mock.bold = mock;
    mock.italic = mock;
    return mock;
  };
  return { default: createChainedMock() };
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
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
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
