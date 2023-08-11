"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unitsFormatter_1 = require("./unitsFormatter");
describe("unitsFormatter", () => {
    it("should format bytes to MB if less than 1000MB", () => {
        expect((0, unitsFormatter_1.unitsFormatter)(500000)).toBe("0.50MB");
        expect((0, unitsFormatter_1.unitsFormatter)(999999999)).toBe("1000.00MB");
    });
    it("should format bytes to GB if 1000MB or more", () => {
        expect((0, unitsFormatter_1.unitsFormatter)(1000000000)).toBe("1.00GB");
        expect((0, unitsFormatter_1.unitsFormatter)(25000000000)).toBe("25.00GB");
    });
    it("should handle 0 bytes", () => {
        expect((0, unitsFormatter_1.unitsFormatter)(0)).toBe("0.00MB");
    });
});
//# sourceMappingURL=unitsFormatter.test.js.map