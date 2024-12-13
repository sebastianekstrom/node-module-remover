import readline from "node:readline";
import { prompt } from "./prompt";
import { describe, it, expect, vi } from "vitest";

vi.mock("node:readline");

describe("prompt", () => {
  it("should return the user input", async () => {
    const mockQuestion = vi.fn((_, question) => {
      question("test input");
    });

    readline.createInterface = vi.fn().mockReturnValue({
      question: mockQuestion,
      close: vi.fn(),
    });

    const result = await prompt("What is your input?");
    expect(result).toBe("test input");
    expect(mockQuestion).toHaveBeenCalledWith(
      "What is your input?",
      expect.any(Function),
    );
  });
});
