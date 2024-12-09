export function unitsFormatter(bytes: number): string {
  const megaBytes = bytes / (1000 * 1000);

  if (megaBytes < 1000) {
    return `${megaBytes.toFixed(2)}MB`;
  }

  const gigaBytes = megaBytes / 1000;
  return `${gigaBytes.toFixed(2)}GB`;
}
