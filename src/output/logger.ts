import chalk from "chalk";

type Prefix = "default" | "info" | "error" | "warning" | "none";

export const generatePrefix = (type?: Prefix) => {
  if (type === "default") {
    return chalk.green("◉");
  }

  if (type === "error") {
    return chalk.red("◉");
  }

  if (type === "info") {
    return chalk.blue("◉");
  }

  if (type === "warning") {
    return chalk.yellow("◉");
  }

  if (type === "none") {
    return "";
  }

  return chalk.green("◉");
};

interface LogMessage {
  message: string;
  prefix?: Prefix;
}

export const logger = ({ message, prefix = "default" }: LogMessage) => {
  console.log(`${generatePrefix(prefix)} ${message}`);
};
