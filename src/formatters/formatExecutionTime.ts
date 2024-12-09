export const formatExecutionTime = (startTime: number, endTime: number) => {
  const executionTimeInSeconds = (endTime - startTime) / 1000;

  const result = Number.isInteger(executionTimeInSeconds)
    ? `${executionTimeInSeconds}s`
    : `${executionTimeInSeconds.toFixed(1)}s`;

  return result;
};
