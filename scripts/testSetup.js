// console.log's are outputted during tests, which makes the test run bloated
jest.spyOn(global.console, "log").mockImplementationOnce((message) => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (message && !message.includes("Please provide a path")) {
    global.console.warn(message);
  }
});
