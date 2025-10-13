# Snak - Contract Plugin

The Contract Plugin provides comprehensive tools for declaring, deploying, and managing Starknet smart contracts.

## Features

This plugin adds the following tools:

- **declare_contract**: Declare a Starknet contract using sierra and casm file paths.
- **deploy_contract**: Deploy a declared Starknet contract using sierra and casm file paths.
- **get_constructor_params**: Get constructor parameters from a contract sierra file.

## Usage

The Contract Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform contract-related tasks, it will use the appropriate tool from this plugin:

```
"Declare my contract using these files..."  // Uses declare_contract
"Deploy the contract at class hash 0x..."  // Uses deploy_contract
"What are the constructor parameters for this contract?"  // Uses get_constructor_params
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
