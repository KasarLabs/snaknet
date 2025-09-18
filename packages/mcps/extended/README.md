# Snak - Extended MCP

The Extended MCP provides comprehensive tools for advanced Starknet blockchain interactions, offering extended functionality beyond basic operations for power users and developers.

## Features

This MCP adds the following tools:

- **extended_get_account_info**: Get detailed account information including nonce, balance, and contract details.
- **extended_estimate_fee**: Estimate transaction fees for complex operations.
- **extended_batch_calls**: Execute multiple contract calls in a single transaction.
- **extended_deploy_contract**: Deploy new contracts to the Starknet network.
- **extended_get_events**: Query and filter blockchain events from contracts.
- **extended_get_storage**: Read contract storage at specific keys.

## Usage

The Extended MCP is used by Claude Code and compatible MCP clients. Configure it in your MCP settings to enable advanced Starknet functionality.

## Example

When asking the agent to perform advanced Starknet tasks, it will use the appropriate tool from this MCP:

```
"Get detailed info for account 0x123..."  // Uses extended_get_account_info
"Estimate gas for a complex transaction"  // Uses extended_estimate_fee
"Execute multiple calls atomically"  // Uses extended_batch_calls
"Deploy my contract to Starknet"  // Uses extended_deploy_contract
"Find all Transfer events from this contract"  // Uses extended_get_events
"Read storage slot 0x5 from contract 0x456..."  // Uses extended_get_storage
```

## Development

To extend this MCP, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/tools/index.ts`.