# Extended MCP - Implementation Notes

## ✅ Implemented Features

### Account Management Tools (READ) - Fully Functional
All these tools work immediately with just an API key:

1. **extended_get_balance** - Current account balance
2. **extended_get_positions** - Open positions
3. **extended_get_open_orders** - Active orders
4. **extended_get_order_by_id** - Specific order details
5. **extended_get_trades_history** - Trade history with filters
6. **extended_get_orders_history** - Order history with filters
7. **extended_get_positions_history** - Closed positions history
8. **extended_get_funding_payments** - Funding payments history
9. **extended_get_leverage** - Current leverage settings
10. **extended_get_fees** - Fee schedule

### Trading Tools (WRITE) - Partial Implementation
These tools are implemented but require additional work:

1. **extended_cancel_order** - ✅ Fully functional
2. **extended_update_leverage** - ✅ Fully functional
3. **extended_create_limit_order** - ⚠️ Requires Stark signature implementation
4. **extended_create_market_order** - ⚠️ Requires Stark signature implementation

## ⚠️ Important: Stark Signature Implementation

### Why Signatures Are Required

Extended uses StarkEx Layer 2 for settlement, which requires cryptographic signatures for order submission. This ensures that only the account owner can place orders.

### What Needs to Be Implemented

For `create_limit_order` and `create_market_order` to work, you need to implement:

```typescript
settlement: {
  starkKey: string,      // Derived from user's private key
  signature: {
    r: string,           // Signature component
    s: string            // Signature component
  },
  nonce: number          // Account nonce for replay protection
}
```

### Implementation Steps

1. **Generate Stark Key Pair**
   - Derive Stark key from Starknet private key
   - Store/retrieve starkKey securely

2. **Create Message Hash**
   - Hash order parameters according to Extended's specification
   - Include: market, side, quantity, price, nonce, etc.

3. **Sign the Hash**
   - Use Stark curve signing (different from regular Starknet signatures)
   - Generate r and s components

4. **Get Account Nonce**
   - Query Extended API for current nonce
   - Increment for each new order

### Resources for Implementation

- **Extended API Documentation**: https://api.docs.extended.exchange/
- **StarkEx Documentation**: Check for message signing specifications
- **Starknet.js**: May have utilities for Stark signatures
- **Contact Extended Support**: For specific signing requirements

### Current Behavior

The order creation tools currently return an error message:
```
"Stark signature generation not yet implemented.
Please implement the settlement object with starkKey, signature.r, signature.s, and nonce."
```

## 📁 File Structure

```
packages/mcps/extended/
├── src/
│   ├── tools/
│   │   ├── read/                      # 10 READ tools (fully functional)
│   │   │   ├── getBalance.ts
│   │   │   ├── getPositions.ts
│   │   │   ├── getOpenOrders.ts
│   │   │   ├── getOrderById.ts
│   │   │   ├── getTradesHistory.ts
│   │   │   ├── getOrdersHistory.ts
│   │   │   ├── getPositionsHistory.ts
│   │   │   ├── getFundingPayments.ts
│   │   │   ├── getLeverage.ts
│   │   │   └── getFees.ts
│   │   └── write/                     # 4 WRITE tools (2 need signatures)
│   │       ├── createLimitOrder.ts    # ⚠️ Needs Stark signature
│   │       ├── createMarketOrder.ts   # ⚠️ Needs Stark signature
│   │       ├── cancelOrder.ts         # ✅ Works
│   │       └── updateLeverage.ts      # ✅ Works
│   ├── schemas/
│   │   └── index.ts                   # Zod validation schemas
│   ├── lib/
│   │   ├── types/
│   │   │   └── index.ts              # TypeScript interfaces
│   │   └── utils/
│   │       └── api.ts                # HTTP client (GET/POST/PUT/DELETE)
│   └── index.ts                      # MCP server setup
├── .env.example                      # Environment variables template
├── package.json
├── README.md
└── IMPLEMENTATION_NOTES.md (this file)
```

## 🔧 Environment Variables

Required in `.env`:
```bash
EXTENDED_API_KEY=your_api_key_here
EXTENDED_API_URL=https://api.starknet.extended.exchange  # Optional
```

## 🚀 Usage Examples

### Query Account Information
```typescript
// Get balance
await extended_get_balance({})

// Get open positions
await extended_get_positions({})

// Get trade history for BTC-USD in last 7 days
const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
await extended_get_trades_history({
  market_id: "BTC-USD",
  start_time: sevenDaysAgo,
  limit: 100
})
```

### Manage Orders
```typescript
// Cancel an order
await extended_cancel_order({ order_id: "12345" })

// Update leverage
await extended_update_leverage({
  market_id: "BTC-USD",
  leverage: 10
})
```

## 📝 Next Steps

To complete the implementation:

1. **Research Stark Signature Generation**
   - Review Extended's signature requirements
   - Check if starknet.js has utilities
   - Contact Extended support if needed

2. **Implement Signature Generation**
   - Create utility functions for key derivation
   - Implement message hashing
   - Add signature generation

3. **Add Nonce Management**
   - Create tool to query current nonce
   - Implement nonce tracking

4. **Update Order Creation Tools**
   - Replace placeholder code
   - Add signature generation calls
   - Test with Extended API

5. **Add Tests**
   - Unit tests for signature generation
   - Integration tests with Extended API
   - Mock signature verification

## 🎯 Design Decisions

### Why Separate Read/Write?
- **Clarity**: Clear distinction between query and action tools
- **Security**: Different permission levels
- **Development**: READ tools work immediately, WRITE needs more work

### Why Use Extended API Instead of On-chain?
- **Performance**: REST API is faster than on-chain queries
- **Features**: Access to orderbook, market data, and trading features
- **Integration**: Extended handles StarkEx settlement complexity

### Why Not Include Stark Signatures?
- **Complexity**: Signature generation requires thorough understanding
- **Security**: Incorrect implementation could compromise user funds
- **Dependency**: May require additional libraries or Extended SDK

## 📚 Additional Resources

- Extended Website: https://starknet.extended.exchange/
- Extended Docs: https://docs.extended.exchange/
- Extended API Docs: https://api.docs.extended.exchange/
- StarkEx Docs: https://docs.starkware.co/starkex/
