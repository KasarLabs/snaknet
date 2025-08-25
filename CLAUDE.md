# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Building and Development
- `pnpm install` - Install dependencies for all packages
- `pnpm run build` - Build all packages using Turbo
- `pnpm run build:ci` - CI build for agents, plugins, and server only
- `pnpm run dev` - Start development mode for agents
- `pnpm run dev:server` - Start server in development mode

### Testing
- `pnpm test` - Run comprehensive test suite via shell script
- `pnpm run start:test` - Run tests using Turbo
- `./scripts/run_all_test.sh` - Shell script for running all tests

### Linting and Code Quality
- `pnpm run lint` - Lint all packages in parallel
- `pnpm run lint:fix` - Fix linting issues in all packages
- `pnpm run check-types` - TypeScript type checking for all packages
- `pnpm run format` - Format code using Prettier

### Server Operations
- `pnpm run start:server` - Build and start server with Docker setup
- `pnpm run docker-setup` - Set up Docker containers for development
- `pnpm run start:prod` - Start server in production mode

## Architecture Overview

### Monorepo Structure
This is a Lerna-managed monorepo with packages in three main directories:
- `packages/` - Core infrastructure (database, shared utilities)
- `plugins/` - Protocol-specific implementations (Avnu, Argent, Braavos, etc.)
- `mcps/` - MCP (Model Context Protocol) servers

### Core Components
- **Database Package** (`packages/database/`) - PostgreSQL integration with queries for contracts, memory, chat pools, and RAG
- **Plugin System** - Each protocol has its own plugin with actions, ABIs, schemas, and utilities
- **Agent System** - AI agents powered by Starknet with configurable models and behaviors

### Plugin Architecture
Each plugin follows a consistent structure:
```
plugins/[protocol]/
├── src/
│   ├── actions/     # Protocol-specific operations
│   ├── abis/        # Contract ABIs
│   ├── constants/   # Protocol constants
│   ├── schemas/     # Zod validation schemas
│   ├── tools/       # Tool implementations
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Helper utilities
├── __test__/        # Jest test files
└── package.json     # Plugin-specific dependencies
```

### Key Technologies
- **Starknet** - Blockchain integration using starknet.js
- **NestJS** - Server framework for API and WebSocket support
- **TypeScript** - Primary language with strict typing
- **Turbo** - Monorepo build system for efficient builds and caching
- **Lerna** - Package management and versioning
- **Jest** - Testing framework across all packages
- **Zod** - Schema validation for all user inputs and API responses
- **MCP (Model Context Protocol)** - Open standard for AI system integration with external data sources and tools

### Environment Configuration
Requires `.env` file with:
- Starknet wallet credentials (address, private key, RPC URL)
- AI provider API keys (OpenAI, Anthropic, Gemini, etc.)
- PostgreSQL database configuration
- Server configuration (API key, port)

## Model Context Protocol (MCP) Integration

### MCP Architecture
This codebase implements MCP servers in the `mcps/` directory, following the official specification:
- **Protocol**: JSON-RPC 2.0 for client-server communication
- **Communication**: Stateful connections between AI applications (hosts), connectors (clients), and MCP servers
- **Security**: Implements user consent and control principles with explicit authorization requirements

### MCP Server Capabilities
MCP servers in this codebase can provide:
1. **Resources** - Structured context and data for AI models
2. **Prompts** - Pre-defined templates and workflows for model interactions  
3. **Tools** - Executable functions that AI models can invoke

### MCP Configuration
Agent configurations support MCP server definitions in the `mcpServers` section:
```json
{
  "mcpServers": {
    "server_name": {
      "command": "node|npx",
      "args": ["path/to/server"],
      "env": {
        "API_KEY": "your_api_key"
      }
    }
  }
}
```

### MCP Security Considerations
- All MCP servers act as OAuth Resource Servers (2025 specification)
- Resource Indicators (RFC 8707) are required for client implementations
- User consent is required for data access and tool execution
- Server visibility into prompts is intentionally limited

### Development Workflow
1. The system uses conventional commits and feature branch workflow
2. All packages are built simultaneously using Turbo's dependency graph
3. Tests must pass before PR approval
4. Docker Compose handles local database and service dependencies
5. Plugin development follows the existing patterns in protocol-specific directories
6. MCP servers follow the official ModelContextProtocol specification (2025-06-18)