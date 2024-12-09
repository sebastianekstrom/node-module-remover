import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { adjectives, animals, subjectives } from "./dictionary";

const MOCK_LOCATION = "mock";
const MIN_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_MB = 100;
const MIN_FOLDERS_CREATED = 10;
const MAX_FOLDERS_CREATE = 20;

const cleanMockFolder = () => {
  const mockFolderPath = path.resolve(MOCK_LOCATION);
  if (fs.existsSync(mockFolderPath)) {
    console.log(`${chalk.red("◉")} Removed existing mock folder`);
    fs.rmSync(mockFolderPath, { recursive: true, force: true });
  }
};

const generateMockFiles = () => {
  cleanMockFolder();

  const numberOfFolders =
    Math.floor(Math.random() * (MAX_FOLDERS_CREATE - MIN_FOLDERS_CREATED + 1)) +
    MIN_FOLDERS_CREATED;

  Array.from({ length: numberOfFolders }).forEach(() => {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    const randomSubjective =
      subjectives[Math.floor(Math.random() * subjectives.length)];
    const folderName = `${randomAdjective}${randomAnimal}${randomSubjective}`;

    const tmpDir = path.resolve(`${MOCK_LOCATION}/${folderName}`);
    const nodeModulesDir = path.join(tmpDir, "node_modules");

    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    if (!fs.existsSync(nodeModulesDir)) {
      fs.mkdirSync(nodeModulesDir);
    }

    const fileSizeMB =
      Math.floor(Math.random() * (MAX_FILE_SIZE_MB - MIN_FILE_SIZE_MB + 1)) +
      MIN_FILE_SIZE_MB;
    const fileSize = fileSizeMB * 1024 * 1024;

    const filePath = path.join(nodeModulesDir, `dummy_file_0.bin`);
    const buffer = Buffer.alloc(fileSize);
    fs.writeFileSync(filePath, buffer);
    console.log(
      `${chalk.blue("◉")} Created ${chalk.bold(filePath)} (${chalk.bold(
        fileSizeMB,
      )}MB)`,
    );
  });

  console.log(
    `${chalk.green("◉")} Mocked node_modules created in the ${chalk.italic(
      "./mock",
    )} folder`,
  );
  console.log(
    `${chalk.blue("◉")} Run ${chalk.italic(
      "bun run dev ./mock",
    )} to run the script`,
  );
};

generateMockFiles();
