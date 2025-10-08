#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account, constants } from 'starknet';
import dotenv from 'dotenv';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import {
  stakeSchema,
  unstakeSchema,
  claimSchema,
  previewStakeSchema,
  previewUnstakeSchema,
  getUserBalanceSchema,
  getTotalStakedSchema,
  getWithdrawRequestInfoSchema,
} from './schemas/index.js';

import { stake } from './tools/write/stake.js';
import { unstake } from './tools/write/unstake.js';
import { claim } from './tools/write/claim.js';

import { previewStake } from './tools/read/previewStake.js';
import { previewUnstake } from './tools/read/previewUnstake.js';
import { getUserBalance } from './tools/read/getUserBalance.js';
import { getTotalStaked } from './tools/read/getTotalStaked.js';
import { getWithdrawRequestInfo } from './tools/read/getWithdrawRequestInfo.js';

import { envRead, envWrite } from './interfaces/index.js';

dotenv.config();

const server = new McpServer({
  name: 'endurfi-mcp',
  version: '0.1.0',
});

const getEnvRead = (): envRead => {
  if (!process.env.STARKNET_RPC_URL) {
    throw new Error('Missing required environment variables: STARKNET_RPC_URL');
  }
  return {
    provider: new RpcProvider({ nodeUrl: process.env.STARKNET_RPC_URL }),
  };
};

const getEnvWrite = (): envWrite => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;

  if (!rpcUrl || !privateKey || !accountAddress) {
    throw new Error(
      'Missing required environment variables: STARKNET_RPC_URL, STARKNET_PRIVATE_KEY, STARKNET_ACCOUNT_ADDRESS'
    );
  }

  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  const account = new Account(
    provider,
    accountAddress,
    privateKey,
    undefined,
    constants.TRANSACTION_VERSION.V3
  );

  return {
    provider,
    account,
  };
};

const registerTools = (EndurfiToolRegistry: mcpTool[]) => {
  // Read operations
  EndurfiToolRegistry.push({
    name: 'preview_stake',
    description:
      'Preview how much liquid staking token (xSTRK, xyWBTC, etc.) will be received for staking a given amount of underlying token (STRK, WBTC, tBTC, LBTC)',
    schema: previewStakeSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await previewStake(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'preview_unstake',
    description:
      'Preview how much underlying token (STRK, WBTC, tBTC, LBTC) will be received for unstaking a given amount of liquid staking token (xSTRK, xyWBTC, etc.)',
    schema: previewUnstakeSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await previewUnstake(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_user_balance',
    description:
      'Get user liquid staking token balance (xSTRK, xyWBTC, etc.) and its underlying token equivalent value for any token type',
    schema: getUserBalanceSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getUserBalance(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_total_staked',
    description:
      'Get total amount of underlying token (STRK, WBTC, tBTC, LBTC) staked on Endur.fi (TVL) for a specific token type',
    schema: getTotalStakedSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getTotalStaked(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_withdraw_request_info',
    description:
      'Get information about a withdraw request NFT including status, amount, and claimability for any token type',
    schema: getWithdrawRequestInfoSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getWithdrawRequestInfo(envRead, params);
    },
  });

  // Write operations
  EndurfiToolRegistry.push({
    name: 'stake',
    description:
      'Stake tokens (STRK, WBTC, tBTC, LBTC) to receive liquid staking tokens (xSTRK, xyWBTC, etc.). No fees on staking. Rewards auto-compound.',
    schema: stakeSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await stake(envWrite, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'unstake',
    description:
      'Unstake liquid staking tokens (xSTRK, xyWBTC, etc.) via the withdraw queue. Creates a withdraw request NFT. Wait 1-2 days before claiming. No slippage.',
    schema: unstakeSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await unstake(envWrite, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'claim',
    description:
      'Claim underlying tokens (STRK, WBTC, tBTC, LBTC) from a withdraw request NFT after the waiting period (1-2 days)',
    schema: claimSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await claim(envWrite, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: mcpTool[] = [];
  registerTools(tools);
  await registerToolsWithServer(server, tools);
};

async function main() {
  const transport = new StdioServerTransport();

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet Endurfi MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
