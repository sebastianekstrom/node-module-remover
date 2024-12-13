import { expect, describe, it } from "vitest";
import { unitsFormatter } from "./unitsFormatter";

describe("unitsFormatter", () => {
  it("should format bytes to MB if less than 1000MB", () => {
    expect(unitsFormatter(500000)).toBe("0.50MB");
    expect(unitsFormatter(999999999)).toBe("1000.00MB");
  });

  it("should format bytes to GB if 1000MB or more", () => {
    expect(unitsFormatter(1000000000)).toBe("1.00GB");
    expect(unitsFormatter(25000000000)).toBe("25.00GB");
  });

  it("should handle 0 bytes", () => {
    expect(unitsFormatter(0)).toBe("0.00MB");
  });
});
