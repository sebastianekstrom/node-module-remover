# 🗑️ node-modules-cleanup

[![npm version](https://badge.fury.io/js/node-modules-cleanup.svg)](https://badge.fury.io/js/node-modules-cleanup)
[![codecov](https://codecov.io/gh/sebastianekstrom/node-module-remover/graph/badge.svg?token=GOXVSJ3VQ0)](https://codecov.io/gh/sebastianekstrom/node-module-remover)

A simple CLI to bulk remove `node_modules` folders and free up some of that precious disk space.

![CLI_V6](https://i.imgur.com/JJ0zYzx.gif)

## Usage

```bash
npx node-modules-cleanup@latest <path>
```

## Examples

```bash
# Find all node_modules in the current directory
npx node-modules-cleanup@latest ./

# Find all node_modules in a specific directory
npx node-modules-cleanup@latest ~/Desktop/projects
```

## Development

### Install Bun

This project is built with [Bun](https://bun.sh/), to install it run the following command:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Install dependencies

To install the dependencies, run the following command:

```bash
$ bun install
```

After that you can use these commands:

```bash
$ bun run dev                 # For local development
$ bun run test:js             # Runs the test suite
$ bun run test:unused-code    # Runs the test suite
$ bun run lint                # Run ESLint
$ bun run type-check          # Runs the TypeScript checks
$ bun run build               # Builds the package
```
