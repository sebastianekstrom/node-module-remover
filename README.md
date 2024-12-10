![Logo of node-modules-cleanup!](https://github.com/user-attachments/assets/fb78f9f1-2caf-4bc0-a753-2b1cec1fee8d)

<p align="center" style="margin-bottom: 5px;">
  A simple CLI to bulk remove <em>node_modules</em> folders and free up some of that precious disk space.
</p>

<p align="center">
  <img src="https://badge.fury.io/js/node-modules-cleanup.svg?v=1" alt="" />
  <img src="https://codecov.io/gh/sebastianekstrom/node-module-remover/graph/badge.svg?token=GOXVSJ3VQ0" alt="" />
</p>

---

<p align="center">
  ⭐️ <a href="#-usage">Usage</a> • <a href="#-examples">Examples</a> • <a href="#-arguments">Arguments</a> • <a href="#-development">Development</a> ⭐️
</p>

---

![CLI_V6](https://github.com/user-attachments/assets/fa0a10dc-59fa-4a03-a652-ffdd7eda4ddd)

## 🚀 Usage

```bash
npx node-modules-cleanup@latest <path>
```

## 📚 Examples

```bash
# Find all node_modules in the current directory
npx node-modules-cleanup@latest ./

# Find all node_modules in a specific directory
npx node-modules-cleanup@latest ~/Desktop/projects

# Skip confirmation of deleting folders
npx node-modules-cleanup@latest ~/Desktop/projects --skip-confirmation
```

## 📝 Arguments

| Argument              | Description                                   | Required |
| --------------------- | --------------------------------------------- | -------- |
| `<path>`              | The path to search for `node_modules` folders | Yes      |
| `--help`              | Show help information                         | No       |
| `--version`           | Show package version                          | No       |
| `--skip-confirmation` | Skip confirmation before deleting folders     | No       |

## 💻 Development

### Install Bun

This project is built with [Bun](https://bun.sh/), to install it run the following command:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Install dependencies

To install the dependencies, run the following command:

```bash
bun install
```

### Generate mocked `node_modules` folders

For easier development, a script is available that will generate multiple mocked`node_modules` folders inside of `./mock`. These will then be populated with dummy files that ranges in size.

```bash
bun run create-mocks
```

### Run the script

The following command will then execute the script.

```bash
bun run dev ./mock          # Or any other path
```

### Useful commands during development

```bash
bun run dev                 # For local development
bun run test:js             # Runs the test suite
bun run test:unused-code    # Check for unused code
bun run lint                # Run ESLint
bun run type-check          # Runs the TypeScript checks
bun run build               # Builds the package
```
