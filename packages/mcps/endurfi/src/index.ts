#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account, constants } from 'starknet';

import dotenv from 'dotenv';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import {
  stakeStrkSchema,
  unstakeXstrkQueueSchema,
  claimUnstakeRequestSchema,
  previewStakeSchema,
  previewUnstakeSchema,
  getUserXstrkBalanceSchema,
  getTotalStakedStrkSchema,
  getWithdrawRequestInfoSchema,
} from './schemas/index.js';

import { stakeStrk } from './tools/write/stakeStrk.js';
import { unstakeXstrkQueue } from './tools/write/unstakeXstrkQueue.js';
import { claimUnstakeRequest } from './tools/write/claimUnstakeRequest.js';

import { previewStake } from './tools/read/previewStake.js';
import { previewUnstake } from './tools/read/previewUnstake.js';
import { getUserXstrkBalance } from './tools/read/getUserXstrkBalance.js';
import { getTotalStakedStrk } from './tools/read/getTotalStakedStrk.js';
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
  EndurfiToolRegistry.push({
    name: 'preview_stake_strk',
    description:
      'Preview how much xSTRK will be received for a given amount of STRK before staking',
    schema: previewStakeSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await previewStake(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'preview_unstake_xstrk',
    description:
      'Preview how much STRK will be received for a given amount of xSTRK before unstaking',
    schema: previewUnstakeSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await previewUnstake(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_user_xstrk_balance',
    description:
      'Get the xSTRK balance and its STRK equivalent value for a user address',
    schema: getUserXstrkBalanceSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getUserXstrkBalance(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_total_staked_strk',
    description:
      'Get the total amount of STRK staked on Endur.fi (Total Value Locked - TVL)',
    schema: getTotalStakedStrkSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getTotalStakedStrk(envRead, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'get_withdraw_request_info',
    description:
      'Get information about a withdraw request (NFT) including status, amount, and claimability',
    schema: getWithdrawRequestInfoSchema,
    execute: async (params: any) => {
      const envRead = getEnvRead();
      return await getWithdrawRequestInfo(envRead, params);
    },
  });

  // Write operations
  EndurfiToolRegistry.push({
    name: 'stake_strk',
    description:
      'Stake STRK tokens to receive xSTRK (liquid staking tokens). No fees on staking. Rewards auto-compound.',
    schema: stakeStrkSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await stakeStrk(envWrite, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'unstake_xstrk_queue',
    description:
      'Unstake xSTRK tokens via the withdraw queue. Creates a withdraw request (NFT). Wait 1-2 days before claiming. No slippage.',
    schema: unstakeXstrkQueueSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await unstakeXstrkQueue(envWrite, params);
    },
  });

  EndurfiToolRegistry.push({
    name: 'claim_unstake_request',
    description:
      'Claim STRK tokens from a withdraw request after the waiting period (1-2 days)',
    schema: claimUnstakeRequestSchema,
    execute: async (params: any) => {
      const envWrite = getEnvWrite();
      return await claimUnstakeRequest(envWrite, params);
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
