# Snak - Endurfi MCP

The Endurfi MCP provides tools for interacting with Endur Protocol, the leading liquid staking solution on Starknet that allows users to stake STRK tokens while maintaining liquidity through xSTRK tokens.

## About Endur Protocol

Endur is a liquid staking platform offering xSTRK, a tradeable Liquid Staking Token (LST) on Starknet. The protocol is backed by established teams STRKFarm and Karnot, with over 10,000 accounts actively liquid staking. Key features include:

- **Liquid Staking**: Stake STRK tokens while receiving tradeable xSTRK tokens
- **DeFi Integration**: Use xSTRK across various DeFi applications on Starknet
- **Competitive Fees**: 15% fee on staking rewards, 0% on deposits and withdrawals
- **Security**: Rigorous audit process ensuring protocol safety
- **Future Plans**: Bitcoin liquid staking coming to Starknet

## Features

This MCP adds the following tools:

- **endurfi_stake_strk**: Stake STRK tokens and receive xSTRK liquid staking tokens.
- **endurfi_unstake_xstrk**: Unstake xSTRK tokens to receive STRK tokens.
- **endurfi_get_staking_info**: Get current staking rates, APY, and protocol information.
- **endurfi_get_balance**: Check your xSTRK and STRK balances.
- **endurfi_get_rewards**: View accumulated staking rewards.
- **endurfi_estimate_returns**: Estimate potential staking returns over time.
- **endurfi_get_validator_info**: Get information about validators in the protocol.

## Usage

The Endurfi MCP is used by Claude Code and compatible MCP clients. Configure it in your MCP settings to enable Endur Protocol liquid staking functionality.

## Example

When asking the agent to perform Endur-related tasks, it will use the appropriate tool from this MCP:

```
"Stake 100 STRK tokens on Endur"  // Uses endurfi_stake_strk
"Unstake 50 xSTRK tokens"  // Uses endurfi_unstake_xstrk
"What's the current staking APY on Endur?"  // Uses endurfi_get_staking_info
"Check my xSTRK balance"  // Uses endurfi_get_balance
"Show my staking rewards"  // Uses endurfi_get_rewards
"Estimate returns for staking 1000 STRK"  // Uses endurfi_estimate_returns
"Show validator information"  // Uses endurfi_get_validator_info
```

## Development

To extend this MCP, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/tools/index.ts`.
