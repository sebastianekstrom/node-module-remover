import readline from "readline";
import { prompt } from "./prompt";

jest.mock("readline");

describe("prompt", () => {
  let mockQuestion: jest.Mock;
  let mockClose: jest.Mock;

  beforeEach(() => {
    mockQuestion = jest.fn();
    mockClose = jest.fn();

    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });
  });

  it("should prompt the user and return their answer", async () => {
    mockQuestion.mockImplementationOnce((_, callback) =>
      // eslint-disable-next-line n/no-callback-literal
      callback("test answer"),
    );

    const answer = await prompt("What is your answer?");

    expect(answer).toBe("test answer");
    expect(mockQuestion).toHaveBeenCalledWith(
      "What is your answer?",
      expect.any(Function),
    );
    expect(mockClose).toHaveBeenCalled();
  });
});
