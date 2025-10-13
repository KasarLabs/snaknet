# Snak - Scarb Plugin

The Scarb Plugin provides comprehensive tools for managing Scarb projects, the build toolchain for Cairo and Starknet smart contracts.

## Features

This plugin adds the following tools:

- **install_scarb**: Install Scarb Cairo toolchain with optional version specification.
- **init_project**: Initialize a new Scarb project with specified name and options.
- **build_project**: Build a Scarb project with specified build options.
- **execute_program**: Execute a Cairo program with optional function and arguments.
- **prove_program**: Generate a proof for a Cairo program execution using Stone prover.
- **verify_program**: Verify a proof generated for a Cairo program.

## Usage

The Scarb Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform Scarb-related tasks, it will use the appropriate tool from this plugin:

```
"Install Scarb version 2.5.0"  // Uses install_scarb
"Initialize a new Cairo project called my_project"  // Uses init_project
"Build my Scarb project"  // Uses build_project
"Execute the main function in my Cairo program"  // Uses execute_program
"Generate a proof for my Cairo program"  // Uses prove_program
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
