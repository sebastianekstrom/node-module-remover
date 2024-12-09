import chalk from "chalk";

type Prefix = "default" | "info" | "error" | "none";

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
  if (prefix === undefined) {
    return message;
  }

  console.log(`${generatePrefix(prefix)} ${message}`);
};
