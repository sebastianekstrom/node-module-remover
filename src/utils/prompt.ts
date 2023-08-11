import readline from 'readline';

export function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });

  return new Promise((resolve) => {
      rl.question(question, (answer) => {
          resolve(answer);
          rl.close();
      });
  });
}