<div align="center">
  <picture>
    <!-- For users in dark mode, load a white logo -->
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/KasarLabs/brand/blob/main/projects/snak/snak-full-white-alpha.png?raw=true">
    <!-- Default image for light mode -->
    <img src="https://github.com/KasarLabs/brand/blob/main/projects/snak/snak-full-black-alpha.png?raw=true" width="200" alt="Snak Logo">
  </picture>

<p>
<a href="https://www.npmjs.com/package/starknet-agent-kit">
<img src="https://img.shields.io/npm/v/starknet-agent-kit.svg" alt="NPM Version" />
</a>
<a href="https://github.com/kasarlabs/snak/blob/main/LICENSE">
<img src="https://img.shields.io/npm/l/starknet-agent-kit.svg" alt="License" />
</a>
<a href="https://github.com/kasarlabs/snak/stargazers">
<img src="https://img.shields.io/github/stars/kasarlabs/snak.svg" alt="GitHub Stars" />
</a>
<a href="https://nodejs.org">
<img src="https://img.shields.io/node/v/starknet-agent-kit.svg" alt="Node Version" />
</a>
</p>
</div>

A comprehensive collection of Model Context Protocol (MCP) servers for Starknet blockchain applications. This repository provides ready-to-use MCP servers that enable AI applications to interact with Starknet protocols, wallets, and DeFi applications.

## What is MCP?

Model Context Protocol (MCP) is an open standard that enables AI applications to securely connect to external data sources and tools. MCP servers act as connectors between AI models and external services, providing structured access to blockchain data and operations.

## Available MCP Servers

### Wallet Management

- **Argent** - Argent X wallet integration
- **Braavos** - Braavos wallet integration
- **OpenZeppelin** - OpenZeppelin account integration
- **OKX** - OKX wallet integration

### DeFi Protocols

- **AVNU** - DEX aggregator and swap functionality
- **Fibrous** - Cross-chain DEX aggregator
- **Opus** - Lending and borrowing protocol
- **Vesu** - Yield farming and staking
- **Unruggable** - Memecoin creation and launch platform

### Core Blockchain Operations

- **ERC20** - Token operations (transfer, approve, balance, etc.)
- **ERC721** - NFT operations (transfer, approve, metadata, etc.)
- **Contract** - Smart contract deployment and interaction
- **Transaction** - Transaction management and monitoring
- **RPC** - Starknet RPC operations and blockchain data

### Development Tools

- **Scarb** - Cairo development and compilation tools
- **ArtPeace** - NFT marketplace integration

## Quick Start

### Prerequisites

- Node.js 16+ and pnpm
- Starknet wallet credentials
- AI application that supports MCP (like Claude Desktop, etc.)

### Installation

```bash
git clone https://github.com/kasarlabs/snaknet.git
cd snaknet
pnpm install
pnpm build
```


## Usage

### Running Individual MCP Servers

Each MCP server can be run independently:

```bash
# Run ERC20 MCP server
cd mcps/erc20
node build/index.js

# Run Argent wallet MCP server
cd mcps/argent
node build/index.js

# Run AVNU DEX MCP server
cd mcps/avnu
node build/index.js
```

### Integration with AI Applications

Configure your AI application to connect to these MCP servers. Example configuration for Claude Desktop:

```json
{
  "mcpServers": {
    "starknet-erc20": {
      "command": "node",
      "args": ["/path/to/snak/mcps/erc20/build/index.js"],
      "env": {
        "STARKNET_PUBLIC_ADDRESS": "your_address",
        "STARKNET_PRIVATE_KEY": "your_private_key",
        "STARKNET_RPC_URL": "your_rpc_url"
      }
    },
    "starknet-argent": {
      "command": "node",
      "args": ["/path/to/snak/mcps/argent/build/index.js"],
      "env": {
        "STARKNET_PUBLIC_ADDRESS": "your_address",
        "STARKNET_PRIVATE_KEY": "your_private_key",
        "STARKNET_RPC_URL": "your_rpc_url"
      }
    }
  }
}
```

### Example Use Cases

- **Token Management**: Transfer ERC20 tokens, check balances, approve spending
- **DeFi Operations**: Swap tokens, provide liquidity, borrow/lend assets
- **Wallet Management**: Create accounts, manage transactions, monitor balances
- **NFT Operations**: Transfer NFTs, manage collections, interact with marketplaces
- **Smart Contract Development**: Deploy contracts, interact with deployed contracts

## Development

### Project Structure

```
mcps/
├── argent/          # Argent wallet MCP server
├── avnu/            # AVNU DEX MCP server
├── braavos/         # Braavos wallet MCP server
├── contract/        # Contract deployment MCP server
├── erc20/           # ERC20 token MCP server
├── erc721/          # ERC721 NFT MCP server
├── fibrous/         # Fibrous DEX MCP server
├── opus/            # Opus lending MCP server
├── rpc/             # Starknet RPC MCP server
├── scarb/           # Scarb development MCP server
├── transaction/     # Transaction management MCP server
└── ...
```

### Adding New MCP Servers

1. Create a new directory in `mcps/`
2. Follow the existing MCP server structure
3. Implement the MCP protocol interface
4. Add tests and documentation


## Security

- All MCP servers implement proper authentication and authorization
- Private keys are handled securely and never exposed
- User consent is required for all operations
- Follow MCP security best practices

## License

MIT License - see the LICENSE file for details.

---

For detailed documentation visit [docs.kasar.io](https://docs.kasar.io)
