# Snak - Opus Plugin

The Opus Plugin provides comprehensive tools for interacting with the Opus protocol on Starknet, a decentralized borrowing platform where users can create and manage Troves (collateralized debt positions).

## Features

This plugin adds the following tools:

- **open_trove**: Open a new Trove on Opus with collateral and borrow CASH.
- **get_user_troves**: Get trove IDs for a specific address on Opus.
- **get_trove_health**: Get the health metrics of a specific trove.
- **get_borrow_fee**: Get the current borrow fee for Opus.
- **deposit_trove**: Deposit additional collateral to an existing Trove.
- **withdraw_trove**: Withdraw collateral from a Trove on Opus.
- **borrow_trove**: Borrow additional CASH from an existing Trove.
- **repay_trove**: Repay CASH debt for a Trove on Opus.

## Usage

The Opus Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform Opus-related tasks, it will use the appropriate tool from this plugin:

```
"Open a trove with 1 ETH collateral and borrow 1000 CASH"  // Uses open_trove
"What troves do I have on Opus?"  // Uses get_user_troves
"Check the health of my trove"  // Uses get_trove_health
"Deposit more collateral to my trove"  // Uses deposit_trove
"Repay 500 CASH on my trove"  // Uses repay_trove
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
