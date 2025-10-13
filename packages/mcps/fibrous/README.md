# Snak - Fibrous Plugin

The Fibrous Plugin provides comprehensive tools for token swapping on Starknet using the Fibrous Router protocol, which finds the best routes across multiple DEXs.

## Features

This plugin adds the following tools:

- **fibrous_swap**: Swap a token for another token using the optimal route.
- **fibrous_batch_swap**: Swap multiple tokens for another token in a single transaction.
- **fibrous_get_route**: Get a specific route for swapping tokens with detailed path information.

## Usage

The Fibrous Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform Fibrous-related tasks, it will use the appropriate tool from this plugin:

```
"Swap 100 USDC for ETH"  // Uses fibrous_swap
"What's the best route to swap DAI for STRK?"  // Uses fibrous_get_route
"Swap multiple tokens to USDC"  // Uses fibrous_batch_swap
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
