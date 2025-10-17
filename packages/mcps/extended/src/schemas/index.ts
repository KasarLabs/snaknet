import { z } from 'zod';

// ========================================
// READ SCHEMAS (Account Management)
// ========================================

/**
 * Schema for getting account balance
 */
export const GetBalanceSchema = z.object({});
export type GetBalanceSchema = z.infer<typeof GetBalanceSchema>;

/**
 * Schema for getting account balance
 */
export const GetUserAccountInfoSchema = z.object({});
export type GetUserAccountInfoSchema = z.infer<typeof GetUserAccountInfoSchema>;

/**
 * Schema for getting open positions
 */
export const GetPositionsSchema = z.object({
  market: z.string().optional().describe('Filter by market name (e.g., "BTC-USD")'),
  side: z.enum(['LONG', 'SHORT']).optional().describe('Position side: LONG or SHORT'),
});
export type GetPositionsSchema = z.infer<typeof GetPositionsSchema>;

/**
 * Schema for getting open orders
 */
export const GetOpenOrdersSchema = z.object({
  market: z.string().optional().describe('Filter by market name (e.g., "BTC-USD")'),
  type: z.enum(['LIMIT', 'MARKET']).optional().describe('Order type: LIMIT or MARKET'),
  side: z.enum(['BUY', 'SELL']).optional().describe('Order side: BUY or SELL'),
});
export type GetOpenOrdersSchema = z.infer<typeof GetOpenOrdersSchema>;

/**
 * Schema for getting order by ID
 */
export const GetOrderByIdSchema = z.object({
  order_id: z.string().describe('The unique identifier of the order'),
});
export type GetOrderByIdSchema = z.infer<typeof GetOrderByIdSchema>;

/**
 * Schema for getting trades history
 */
export const GetTradesHistorySchema = z.object({
  market_id: z.string().optional().describe('Filter by market ID (e.g., "BTC-USD")'),
  start_time: z.number().optional().describe('Unix timestamp in milliseconds to start filtering'),
  end_time: z.number().optional().describe('Unix timestamp in milliseconds to end filtering'),
  limit: z.number().optional().describe('Maximum number of records to return (default: 100)'),
});
export type GetTradesHistorySchema = z.infer<typeof GetTradesHistorySchema>;

/**
 * Schema for getting orders history
 */
export const GetOrdersHistorySchema = z.object({
  market_id: z.string().optional().describe('Filter by market ID (e.g., "BTC-USD")'),
  status: z.enum(['FILLED', 'CANCELED', 'REJECTED']).optional().describe('Filter by order status'),
  start_time: z.number().optional().describe('Unix timestamp in milliseconds to start filtering'),
  end_time: z.number().optional().describe('Unix timestamp in milliseconds to end filtering'),
  limit: z.number().optional().describe('Maximum number of records to return (default: 100)'),
});
export type GetOrdersHistorySchema = z.infer<typeof GetOrdersHistorySchema>;

/**
 * Schema for getting positions history
 */
export const GetPositionsHistorySchema = z.object({
  market_id: z.string().optional().describe('Filter by market ID (e.g., "BTC-USD")'),
  side: z.enum(['LONG', 'SHORT']).optional().describe('Position side: LONG or SHORT'),
  start_time: z.number().optional().describe('Unix timestamp in milliseconds to start filtering'),
  end_time: z.number().optional().describe('Unix timestamp in milliseconds to end filtering'),
  limit: z.number().optional().describe('Maximum number of records to return (default: 100)'),
});
export type GetPositionsHistorySchema = z.infer<typeof GetPositionsHistorySchema>;

/**
 * Schema for getting funding payments
 */
export const GetFundingPaymentsSchema = z.object({
  market: z.string().optional().describe('List of names of the requested markets (e.g., "BTC-USD")'),
  side: z.enum(['long', 'short']).optional().describe('Position side: long or short'),
  fromTime: z.number().describe('Starting timestamp in epoch milliseconds (required)'),
});
export type GetFundingPaymentsSchema = z.infer<typeof GetFundingPaymentsSchema>;

/**
 * Schema for getting current leverage settings
 */
export const GetLeverageSchema = z.object({
  market: z.string().optional().describe('Name of the requested market (e.g., "BTC-USD"). Can request multiple markets by calling the API multiple times.'),
});
export type GetLeverageSchema = z.infer<typeof GetLeverageSchema>;

/**
 * Schema for getting fee schedule
 */
export const GetFeesSchema = z.object({
  market: z.string().optional().describe('Name of the requested market (e.g., "BTC-USD") to get market-specific fees.'),
});
export type GetFeesSchema = z.infer<typeof GetFeesSchema>;

// ========================================
// WRITE SCHEMAS (Trading)
// ========================================

/**
 * Schema for creating a limit order
 */
export const CreateLimitOrderSchema = z.object({
  external_id: z.string().describe('External unique identifier for the order'),
  market: z.string().describe('Trading pair (e.g., "BTC-USD", "ETH-USD")'),
  side: z.enum(['BUY', 'SELL']).describe('Order side'),
  qty: z.string().describe('Order quantity'),
  price: z.string().describe('Limit price for the order'),
  post_only: z.boolean().optional().default(false).describe('If true, order will only be placed if it does not immediately match'),
  reduce_only: z.boolean().optional().default(false).describe('If true, order will only reduce existing position'),
  time_in_force: z.enum(['GTC', 'IOC', 'FOK', 'GTT']).optional().default('GTC').describe('Time in force: GTC (Good Till Cancel), IOC (Immediate or Cancel), FOK (Fill or Kill), GTT (Good Till Time)'),
  expiry_epoch_millis: z.number().optional().describe('Expiry time for GTT orders (Unix timestamp in milliseconds)'),
  nonce: z.number().optional().describe('Order nonce for signature (auto-generated if not provided, must be ≥1 and ≤2^31)'),
});
export type CreateLimitOrderSchema = z.infer<typeof CreateLimitOrderSchema>;

/**
 * Schema for creating a market order
 */
export const CreateMarketOrderSchema = z.object({
  external_id: z.string().describe('External unique identifier for the order'),
  market: z.string().describe('Trading pair (e.g., "BTC-USD", "ETH-USD")'),
  side: z.enum(['BUY', 'SELL']).describe('Order side'),
  qty: z.string().describe('Order quantity'),
  reduce_only: z.boolean().optional().default(false).describe('If true, order will only reduce existing position'),
  nonce: z.number().optional().describe('Order nonce for signature (auto-generated if not provided, must be ≥1 and ≤2^31)'),
});
export type CreateMarketOrderSchema = z.infer<typeof CreateMarketOrderSchema>;

/**
 * Schema for canceling an order
 */
export const CancelOrderSchema = z.object({
  order_id: z.string().describe('The unique identifier of the order to cancel'),
});
export type CancelOrderSchema = z.infer<typeof CancelOrderSchema>;

/**
 * Schema for updating leverage
 */
export const UpdateLeverageSchema = z.object({
  market_id: z.string().describe('The market ID to update leverage for (e.g., "BTC-USD")'),
  leverage: z.number().describe('The new leverage multiplier (e.g., 10 for 10x)'),
});
export type UpdateLeverageSchema = z.infer<typeof UpdateLeverageSchema>;

/**
 * Schema for mass canceling orders
 */
export const MassCancelOrdersSchema = z.object({
  order_ids: z.array(z.number()).optional().describe('Array of Extended order IDs to cancel'),
  external_order_ids: z.array(z.string()).optional().describe('Array of external order IDs to cancel'),
  markets: z.array(z.string()).optional().describe('Array of market names to cancel all orders in (e.g., ["BTC-USD", "ETH-USD"])'),
  cancel_all: z.boolean().optional().describe('If true, cancel all open orders for the account'),
});
export type MassCancelOrdersSchema = z.infer<typeof MassCancelOrdersSchema>;

/**
 * Schema for canceling order by external ID
 */
export const CancelOrderByExternalIdSchema = z.object({
  external_id: z.string().describe('The external ID of the order to cancel'),
});
export type CancelOrderByExternalIdSchema = z.infer<typeof CancelOrderByExternalIdSchema>;

/**
 * Schema for dead man switch
 */
export const DeadManSwitchSchema = z.object({
  countdown_time: z.number().describe('Time in seconds until all orders are auto-canceled. Set to 0 to disable.'),
});
export type DeadManSwitchSchema = z.infer<typeof DeadManSwitchSchema>;
