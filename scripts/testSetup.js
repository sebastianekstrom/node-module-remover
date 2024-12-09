jest.mock("chalk", () => {
  const createChainedMock = () => {
    const mock = jest.fn((text) => text);
    mock.red = mock;
    mock.green = mock;
    mock.blue = mock;
    mock.bold = mock;
    mock.italic = mock;
    return mock;
  };

  return createChainedMock();
});
