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

### Read Operations

- **get_pool_info**: Get comprehensive information about an Ekubo pool including current price, liquidity, and fee data.
- **get_token_price**: Get the price of a token via Ekubo pools by querying the pool price directly from the Core contract.
- **get_pool_liquidity**: Get the total liquidity available in an Ekubo pool at the current tick.
- **get_pool_fees_per_liquidity**: Get the cumulative fees per unit of liquidity for an Ekubo pool (both token0 and token1).

### Write Operations

- **swap**: Swap tokens on Ekubo DEX. Supports both exact input and exact output swaps with configurable slippage tolerance.
- **create_position**: Create a new liquidity position (NFT) in an Ekubo pool within a specified price range (concentrated liquidity).
- **add_liquidity**: Add liquidity to an existing Ekubo pool position without minting a new NFT.
- **withdraw_liquidity**: Withdraw liquidity from an Ekubo pool position. Can withdraw full position, partial position, or only collect fees.
- **transfer_position**: Transfer an Ekubo NFT position to another address.

## Usage

The Ekubo MCP is used by Claude Code and compatible MCP clients. Configure it in your MCP settings to enable Ekubo Protocol functionality.

## Example

When asking the agent to perform Ekubo-related tasks, it will use the appropriate tool from this MCP:

```
"Get info about the ETH/USDC pool on Ekubo"  // Uses get_pool_info
"What's the price of STRK on Ekubo?"  // Uses get_token_price
"How much liquidity is in the ETH/USDC pool?"  // Uses get_pool_liquidity
"Swap 0.1 ETH for USDC on Ekubo"  // Uses swap
"Create a liquidity position for ETH/USDC"  // Uses create_position
"Add liquidity to my existing position"  // Uses add_liquidity
"Withdraw liquidity from my position"  // Uses withdraw_liquidity
"Transfer my position NFT to another address"  // Uses transfer_position
```

## Development

To extend this MCP, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/tools/index.ts`.
