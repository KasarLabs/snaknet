# Snaknet - Extended MCP

The Extended MCP provides tools for interacting with Extended, a hybrid perpetuals exchange on Starknet with CLOB (Central Limit Order Book) and Layer 2 settlement via StarkEx.

## Features

This MCP provides the following tools:

### Account Management (READ)
- **extended_get_balance**: Get current account balance including collateral, equity, available for trade, and unrealized PnL
- **extended_get_positions**: Get all currently open positions with details including size, PnL, liquidation price, and leverage
- **extended_get_open_orders**: Get all currently open orders including limit and stop orders
- **extended_get_order_by_id**: Get a specific order by its unique ID
- **extended_get_trades_history**: Get historical trades executed by the account with optional filters
- **extended_get_orders_history**: Get historical orders (filled, canceled, or rejected) with optional filters
- **extended_get_positions_history**: Get historical closed positions with realized PnL
- **extended_get_funding_payments**: Get historical funding payments made or received for perpetual positions
- **extended_get_leverage**: Get current leverage settings for all markets
- **extended_get_fees**: Get the current fee schedule including maker, taker, and margin fees

### Trading (WRITE)
- **extended_create_limit_order**: Create a new limit order (⚠️ Requires Stark signature implementation)
- **extended_create_market_order**: Create a new market order (⚠️ Requires Stark signature implementation)
- **extended_cancel_order**: Cancel an existing open order by its ID
- **extended_update_leverage**: Update the leverage multiplier for a specific market

## Configuration

This MCP requires the following environment variables:

```bash
EXTENDED_API_KEY=your_api_key_here
EXTENDED_API_URL=https://api.starknet.extended.exchange  # Optional, defaults to this value
```

### Getting an API Key

1. Visit [Extended Exchange](https://starknet.extended.exchange/)
2. Create an account and complete KYC if required
3. Navigate to API settings
4. Generate a new API key
5. Add the API key to your `.env` file

## Usage

The Extended MCP is used by Claude Code and compatible MCP clients. Configure it in your MCP settings to enable Extended trading functionality.

### Example Queries

```
"What's my current balance on Extended?"  // Uses extended_get_balance
"Show me my open positions"  // Uses extended_get_positions
"What are my open orders?"  // Uses extended_get_open_orders
"Get my trade history for BTC-USD"  // Uses extended_get_trades_history
"What's my current leverage on ETH-USD?"  // Uses extended_get_leverage
"Cancel order 12345"  // Uses extended_cancel_order
"Set leverage to 10x for BTC-USD"  // Uses extended_update_leverage
```

## Important Notes

### Stark Signature Requirement

⚠️ **Trading operations (creating orders) currently require Stark signature implementation.**

The Extended API uses StarkEx Layer 2 settlement, which requires orders to be signed with a Stark key pair. The current implementation includes placeholders for:
- `starkKey`: Derived from your wallet
- `signature.r` and `signature.s`: Generated from order parameters
- `nonce`: Account nonce for replay protection

To implement order creation, you will need to:
1. Generate or import a Stark key pair from your private key
2. Create a message hash from the order parameters according to Extended's specification
3. Sign the hash using the Stark curve
4. Include the signature in the `settlement` object

Refer to the [Extended API Documentation](https://api.docs.extended.exchange/) for detailed signature requirements.

### Read vs Write Operations

- **READ operations** (Account Management): Work immediately with just an API key
- **WRITE operations** (Trading): Require additional Stark signature implementation

## Development

To extend this MCP, add new tools in the `src/tools/read` or `src/tools/write` directories and register them in `src/index.ts`.

### Building

```bash
cd packages/mcps/extended
pnpm build
```

### Running

```bash
pnpm start
# or
node build/index.js
```

### Testing

The Extended MCP includes comprehensive E2E tests:

```bash
# Test all READ tools (safe, no modifications)
pnpm test:read

# Test cancel order (⚠️ cancels real orders)
pnpm test:cancel

# Test update leverage (⚠️ modifies account settings)
pnpm test:leverage
```

See [__tests__/README.md](__tests__/README.md) for detailed testing documentation.

## Architecture

```
packages/mcps/extended/
├── src/
│   ├── tools/
│   │   ├── read/          # Account management tools (no signature required)
│   │   └── write/         # Trading tools (require Stark signature)
│   ├── schemas/           # Zod validation schemas
│   ├── lib/
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # API utilities
│   └── index.ts           # MCP server setup
├── package.json
└── README.md
```

## Resources

- [Extended Exchange](https://starknet.extended.exchange/)
- [Extended API Documentation](https://api.docs.extended.exchange/)
- [Extended Documentation](https://docs.extended.exchange/)
