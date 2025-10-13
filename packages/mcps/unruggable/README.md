# Snak - Unruggable Plugin

The Unruggable Plugin provides comprehensive tools for creating and managing memecoins on Starknet using the Unruggable protocol, which ensures fair launches with locked liquidity.

## Features

This plugin adds the following tools:

- **is_memecoin**: Check if a given address is a memecoin created by the Unruggable Factory.
- **get_locked_liquidity**: Get locked liquidity information for a specific token.
- **create_memecoin**: Create a new memecoin using the Unruggable Factory with specified parameters.
- **launch_on_ekubo**: Launch a memecoin on Ekubo DEX with concentrated liquidity.

## Usage

The Unruggable Plugin is used internally by the Starknet Agent and doesn't need to be called directly. When the agent is initialized, it automatically registers these tools, making them available for use.

## Example

When asking the agent to perform Unruggable-related tasks, it will use the appropriate tool from this plugin:

```
"Create a memecoin called PEPE with 1 million supply"  // Uses create_memecoin
"Is this token an Unruggable memecoin?"  // Uses is_memecoin
"Check the locked liquidity for this token"  // Uses get_locked_liquidity
"Launch my memecoin on Ekubo"  // Uses launch_on_ekubo
```

## Development

To extend this plugin, add new tools in the `src/tools` directory and register them in the `registerTools` function in `src/index.ts`.
