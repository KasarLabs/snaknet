#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import dotenv from 'dotenv';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import { ExtendedApiEnv } from './lib/types/index.js';

// Import READ tools (Account Management)
import { getBalance } from './tools/read/getBalance.js';
import { getPositions } from './tools/read/getPositions.js';
import { getOpenOrders } from './tools/read/getOpenOrders.js';
import { getOrderById } from './tools/read/getOrderById.js';
import { getTradesHistory } from './tools/read/getTradesHistory.js';
import { getOrdersHistory } from './tools/read/getOrdersHistory.js';
import { getPositionsHistory } from './tools/read/getPositionsHistory.js';
import { getFundingPayments } from './tools/read/getFundingPayments.js';
import { getLeverage } from './tools/read/getLeverage.js';
import { getFees } from './tools/read/getFees.js';

// Import WRITE tools (Trading)
import { createLimitOrder } from './tools/write/createLimitOrder.js';
import { createMarketOrder } from './tools/write/createMarketOrder.js';
import { cancelOrder } from './tools/write/cancelOrder.js';
import { updateLeverage } from './tools/write/updateLeverage.js';

// Import schemas
import {
  GetBalanceSchema,
  GetPositionsSchema,
  GetOpenOrdersSchema,
  GetOrderByIdSchema,
  GetTradesHistorySchema,
  GetOrdersHistorySchema,
  GetPositionsHistorySchema,
  GetFundingPaymentsSchema,
  GetLeverageSchema,
  GetFeesSchema,
  CreateLimitOrderSchema,
  CreateMarketOrderSchema,
  CancelOrderSchema,
  UpdateLeverageSchema,
} from './schemas/index.js';

dotenv.config();

const server = new McpServer({
  name: 'extended-mcp',
  version: '0.1.0',
});

// Create API environment from environment variables
const createApiEnv = (): ExtendedApiEnv => {
  const apiKey = process.env.EXTENDED_API_KEY;
  const apiUrl = process.env.EXTENDED_API_URL || 'https://api.starknet.extended.exchange';

  if (!apiKey) {
    throw new Error('EXTENDED_API_KEY environment variable is required');
  }

  return {
    apiKey,
    apiUrl,
  };
};

const registerTools = (env: ExtendedApiEnv, tools: mcpTool[]) => {
  // ========================================
  // READ TOOLS (Account Management)
  // ========================================

  tools.push({
    name: 'extended_get_balance',
    description: 'Get the current account balance including collateral, equity, available for trade, and unrealized PnL',
    schema: GetBalanceSchema,
    execute: async (params) => {
      const result = await getBalance(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_positions',
    description: 'Get all currently open positions with details including size, PnL, liquidation price, and leverage',
    schema: GetPositionsSchema,
    execute: async (params) => {
      const result = await getPositions(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_open_orders',
    description: 'Get all currently open orders including limit and stop orders',
    schema: GetOpenOrdersSchema,
    execute: async (params) => {
      const result = await getOpenOrders(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_order_by_id',
    description: 'Get a specific order by its unique ID',
    schema: GetOrderByIdSchema,
    execute: async (params) => {
      const result = await getOrderById(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_trades_history',
    description: 'Get historical trades executed by the account with optional filters for market, time range, and limit',
    schema: GetTradesHistorySchema,
    execute: async (params) => {
      const result = await getTradesHistory(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_orders_history',
    description: 'Get historical orders (filled, canceled, or rejected) with optional filters',
    schema: GetOrdersHistorySchema,
    execute: async (params) => {
      const result = await getOrdersHistory(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_positions_history',
    description: 'Get historical closed positions with realized PnL',
    schema: GetPositionsHistorySchema,
    execute: async (params) => {
      const result = await getPositionsHistory(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_funding_payments',
    description: 'Get historical funding payments made or received for perpetual positions',
    schema: GetFundingPaymentsSchema,
    execute: async (params) => {
      const result = await getFundingPayments(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_leverage',
    description: 'Get current leverage settings for all markets',
    schema: GetLeverageSchema,
    execute: async (params) => {
      const result = await getLeverage(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_get_fees',
    description: 'Get the current fee schedule including maker, taker, and margin fees',
    schema: GetFeesSchema,
    execute: async (params) => {
      const result = await getFees(env, params);
      return JSON.stringify(result);
    },
  });

  // ========================================
  // WRITE TOOLS (Trading)
  // ========================================

  tools.push({
    name: 'extended_create_limit_order',
    description: 'Create a new limit order. NOTE: Requires Stark signature implementation - currently returns an error. Must implement settlement object with starkKey, signature, and nonce.',
    schema: CreateLimitOrderSchema,
    execute: async (params) => {
      const result = await createLimitOrder(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_create_market_order',
    description: 'Create a new market order. NOTE: Requires Stark signature implementation - currently returns an error. Must implement settlement object with starkKey, signature, and nonce.',
    schema: CreateMarketOrderSchema,
    execute: async (params) => {
      const result = await createMarketOrder(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_cancel_order',
    description: 'Cancel an existing open order by its ID',
    schema: CancelOrderSchema,
    execute: async (params) => {
      const result = await cancelOrder(env, params);
      return JSON.stringify(result);
    },
  });

  tools.push({
    name: 'extended_update_leverage',
    description: 'Update the leverage multiplier for a specific market',
    schema: UpdateLeverageSchema,
    execute: async (params) => {
      const result = await updateLeverage(env, params);
      return JSON.stringify(result);
    },
  });
};

export const RegisterToolInServer = async () => {
  const env = createApiEnv();
  const tools: mcpTool[] = [];
  registerTools(env, tools);
  await registerToolsWithServer(server, tools);
};

async function main() {
  const transport = new StdioServerTransport();

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Extended MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
