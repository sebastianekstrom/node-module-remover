import { expect, describe, it } from 'vitest'
import { formatExecutionTime } from "./formatExecutionTime";

describe("formatExecutionTime", () => {
  it("should format time correctly when there are seconds and milliseconds", () => {
    const startTime = 0;
    const endTime = 1000 + 500; // 1.5 seconds
    expect(formatExecutionTime(startTime, endTime)).toBe("1.5s");
  });

  it("should format time correctly when there are only milliseconds", () => {
    const startTime = 0;
    const endTime = 500; // 0.5 seconds
    expect(formatExecutionTime(startTime, endTime)).toBe("0.5s");
  });

  it("should format time correctly when there are whole seconds", () => {
    const startTime = 0;
    const endTime = 1000 * 182; // 182 seconds
    expect(formatExecutionTime(startTime, endTime)).toBe("182s");
  });
});
