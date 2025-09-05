# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains "Snak" - a comprehensive collection of Model Context Protocol (MCP) servers for Starknet blockchain applications. The project enables AI applications to interact with Starknet protocols, wallets, and DeFi applications through standardized MCP interfaces.

## Architecture

The project uses a monorepo structure managed by Lerna and Turbo:

- **Root Level**: Configuration files, shared dependencies, and monorepo management
- **mcps/**: Individual MCP servers, each self-contained with their own package.json
- **packages/**: Shared packages and utilities (if present)
- **plugins/**: Plugin architecture components (if present)

### Key MCP Servers

Each MCP server in `mcps/` follows a consistent structure:
- `src/tools/index.ts`: Tool registration and exports
- `src/actions/`: Individual action implementations
- `src/schemas/`: Zod validation schemas
- `src/abis/`: Smart contract ABIs
- `src/utils/`: Utility functions
- `package.json`: Individual server configuration

Available MCP servers:
- **Wallet Management**: argent, braavos, openzeppelin, okx
- **DeFi Protocols**: avnu, fibrous, opus, vesu, unruggable  
- **Core Operations**: erc20, erc721, contract, transaction, rpc
- **Development**: scarb, artpeace

## Development Commands

### Build and Development
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
# or
turbo build

# Type checking
pnpm check-types
# or 
turbo run check-types

# Clean build artifacts
pnpm clean:dist
pnpm clean:all  # includes node_modules
```

### Code Quality
```bash
# Lint all code
pnpm lint
pnpm lint:all  # Alternative ESLint command

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
pnpm prettier:all
```

### Running MCP Servers
```bash
# Build first, then run individual servers
cd mcps/erc20 && pnpm build && pnpm start
cd mcps/argent && pnpm build && pnpm start

# Each MCP server runs as: node build/index.js
```

## Environment Configuration

MCP servers require Starknet credentials. Each server expects:
```env
STARKNET_PUBLIC_ADDRESS="your_address"
STARKNET_PRIVATE_KEY="your_private_key"  
STARKNET_RPC_URL="your_rpc_url"
```

Some servers may require additional API keys (AVNU, Fibrous, etc.).

## MCP Server Development Pattern

When working with MCP servers:

1. **Tool Registration**: Tools are registered in `src/tools/index.ts` with name, description, schema, and execute function
2. **Schema Validation**: All inputs use Zod schemas defined in `src/schemas/`
3. **Action Implementation**: Business logic lives in `src/actions/` files
4. **Type Safety**: TypeScript is used throughout with strict typing
5. **Error Handling**: All functions return JSON strings with status/message/data structure

Example tool registration pattern:
```typescript
StarknetToolRegistry.push({
  name: 'action_name',
  plugins: 'server_name', 
  description: 'Clear description of what this tool does',
  schema: validationSchema,
  execute: actionFunction,
});
```

## Testing

No test framework is currently configured. Tests should be added following Node.js/Jest patterns if needed.

## Package Management

- Uses pnpm as package manager
- Lerna manages workspace packages
- Turbo orchestrates build tasks
- Each MCP server is independently buildable and deployable