"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const prompt_1 = require("./prompt");
jest.mock("readline");
describe("prompt", () => {
    let mockQuestion;
    let mockClose;
    beforeEach(() => {
        mockQuestion = jest.fn();
        mockClose = jest.fn();
        readline_1.default.createInterface.mockReturnValue({
            question: mockQuestion,
            close: mockClose,
        });
    });
    it("should prompt the user and return their answer", async () => {
        mockQuestion.mockImplementationOnce((_, callback) => 
        // eslint-disable-next-line n/no-callback-literal
        callback("test answer"));
        const answer = await (0, prompt_1.prompt)("What is your answer?");
        expect(answer).toBe("test answer");
        expect(mockQuestion).toHaveBeenCalledWith("What is your answer?", expect.any(Function));
        expect(mockClose).toHaveBeenCalled();
    });
});
//# sourceMappingURL=prompt.test.js.map