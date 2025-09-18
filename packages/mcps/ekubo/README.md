# Snak - Ekubo MCP

The Ekubo MCP provides tools for interacting with Ekubo Protocol, the next-generation AMM (Automated Market Maker) on Starknet that revolutionizes DeFi with ultra-concentrated liquidity and singleton architecture.

## About Ekubo Protocol

Ekubo is Starknet's leading AMM, commanding 60% of the total AMM TVL and the majority of trading volume on the network. Built by former Uniswap Labs engineers, it features:

- **Singleton Architecture**: All pools consolidated into a single Cairo smart contract for 99% cheaper pool creation
- **Ultra-Concentrated Liquidity**: Up to 100x more capital efficient positions with precision down to 1/100th of a basis point
- **Extensions System**: Custom pool logic deployment without governance approval
- **Till Pattern**: Gas-optimized deferred token transfers

## Features

This MCP adds the following tools:

- **ekubo_get_pools**: Get available liquidity pools and their information.
- **ekubo_swap_tokens**: Execute token swaps through Ekubo's concentrated liquidity.
- **ekubo_get_quote**: Get swap quotes and price information.
- **ekubo_add_liquidity**: Add concentrated liquidity to specific price ranges.
- **ekubo_remove_liquidity**: Remove liquidity positions from pools.
- **ekubo_get_position**: Get information about your liquidity positions.
- **ekubo_get_pool_stats**: Get detailed pool statistics and metrics.

## Usage

The Ekubo MCP is used by Claude Code and compatible MCP clients. Configure it in your MCP settings to enable Ekubo Protocol functionality.

## Example

When asking the agent to perform Ekubo-related tasks, it will use the appropriate tool from this MCP:

```
"Show me ETH/USDC pools on Ekubo"  // Uses ekubo_get_pools
"Swap 0.1 ETH for USDC on Ekubo"  // Uses ekubo_swap_tokens
"Quote 100 USDC to ETH"  // Uses ekubo_get_quote
"Add liquidity to ETH/USDC pool at current price"  // Uses ekubo_add_liquidity
"Show my liquidity positions on Ekubo"  // Uses ekubo_get_position
"Get pool statistics for ETH/USDC"  // Uses ekubo_get_pool_stats
```

## Development

To extend this MCP, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/tools/index.ts`.