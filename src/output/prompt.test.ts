import { prompt } from "./prompt";
import readline from "node:readline";

jest.mock("node:readline", () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn(),
    close: jest.fn(),
  }),
}));

describe("prompt", () => {
  it("should return the answer from readline", async () => {
    const mockAnswer = "some-answer";
    const mockQuestion = "some-question?";

    readline.createInterface = jest.fn().mockReturnValue({
      question: jest.fn((_, callback) => callback(mockAnswer)),
      close: jest.fn(),
    });

    const answer = await prompt(mockQuestion);
    expect(answer).toBe(mockAnswer);
  });

  it("should close the readline interface", async () => {
    const mockQuestion = "another-question?";
    const closeMock = jest.fn();

    readline.createInterface = jest.fn().mockReturnValue({
      question: jest.fn((_, callback) => callback(null, "")),
      close: closeMock,
    });

    await prompt(mockQuestion);
    expect(closeMock).toHaveBeenCalled();
  });
});
