# Snak - Vesu Plugin

The Vesu Plugin provides comprehensive tools for interacting with the Vesu protocol on Starknet, a lending and borrowing platform where users can deposit tokens to earn yield.

## Features

This plugin adds the following tools:

- **vesu_deposit_earn**: Deposit tokens to earn yield on Vesu protocol.
- **vesu_withdraw_earn**: Withdraw tokens from an earning position on Vesu protocol.

## Usage

The Vesu Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform Vesu-related tasks, it will use the appropriate tool from this plugin:

```
"Deposit 100 USDC to earn on Vesu"  // Uses vesu_deposit_earn
"Withdraw my USDC from Vesu"  // Uses vesu_withdraw_earn
"Earn yield on my ETH using Vesu"  // Uses vesu_deposit_earn
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
