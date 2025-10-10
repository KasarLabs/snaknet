#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider } from 'starknet';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import dotenv from 'dotenv';

import { getSpecVersion } from './tools/getSpecVersion.js';
import { getBlockWithTxHashes } from './tools/getBlockWithTxHashes.js';
import { getBlockWithReceipts } from './tools/getBlockWithReceipts.js';
import { getTransactionStatus } from './tools/getTransactionStatus.js';
import { getClass } from './tools/getClass.js';
import { getChainId } from './tools/getChainId.js';
import { getSyncingStats } from './tools/getSyncingStats.js';
import { getBlockNumber } from './tools/getBlockNumber.js';
import { getBlockTransactionCount } from './tools/getBlockTransactionCount.js';
import { getStorageAt } from './tools/getStorageAt.js';
import { getClassAt } from './tools/getClassAt.js';
import { getClassHashAt } from './tools/getClassHashAt.js';
import {
  getStorageAtSchema,
  blockIdSchema,
  blockIdAndContractAddressSchema,
  getClassAtSchema,
  getClassHashAtSchema,
  transactionHashSchema,
} from './schemas/index.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-rpc',
  version: '0.1.0',
});

const createProvider = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  if (!rpcUrl) {
    throw new Error('Missing required environment variable: STARKNET_RPC_URL');
  }
  return new RpcProvider({ nodeUrl: rpcUrl });
};

const registerTools = (RpcToolRegistry: mcpTool[]) => {
  RpcToolRegistry.push({
    name: 'get_chain_id',
    description:
      'Retrieve the unique identifier (chain ID) of the Starknet network',
    execute: async (params: any) => {
      const provider = createProvider();
      return await getChainId(provider);
    },
  });

  RpcToolRegistry.push({
    name: 'get_syncing_status',
    description: 'Retrieve the syncing status of the Starknet node',
    execute: async (params: any) => {
      const provider = createProvider();
      return await getSyncingStats(provider);
    },
  });

  // Add remaining tools from createTools2
  RpcToolRegistry.push({
    name: 'get_class_hash',
    description:
      'Retrieve the unique class hash for a contract at a specific address',
    schema: getClassHashAtSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getClassHashAt(provider, params);
    },
  });

  RpcToolRegistry.push({
    name: 'get_spec_version',
    description: 'Get the current spec version from the Starknet RPC provider',
    execute: async (params: any) => {
      const provider = createProvider();
      return await getSpecVersion(provider);
    },
  });

  RpcToolRegistry.push({
    name: 'get_block_with_tx_hashes',
    description:
      'Retrieve the details of a block, including transaction hashes',
    schema: blockIdSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getBlockWithTxHashes(provider, params);
    },
  });

  RpcToolRegistry.push({
    name: 'get_block_with_receipts',
    description: 'Fetch block details with transaction receipts',
    schema: blockIdSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getBlockWithReceipts(provider, params);
    },
  });

  RpcToolRegistry.push({
    name: 'get_transaction_status',
    description: 'Fetch transaction status by hash',
    schema: transactionHashSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getTransactionStatus(provider, params);
    },
  });

  // Register blockchain query tools
  RpcToolRegistry.push({
    name: 'get_block_number',
    description: 'Get the current block number from the Starknet network',
    execute: async (params: any) => {
      const provider = createProvider();
      return await getBlockNumber(provider);
    },
  });

  RpcToolRegistry.push({
    name: 'get_block_transaction_count',
    description: 'Get the number of transactions in a specific block',
    schema: blockIdSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getBlockTransactionCount(provider, params);
    },
  });

  RpcToolRegistry.push({
    name: 'get_storage_at',
    description: 'Get the storage value at a specific slot for a contract',
    schema: getStorageAtSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getStorageAt(provider, params);
    },
  });

  // Register contract-related tools
  RpcToolRegistry.push({
    name: 'get_class',
    description:
      'Retrieve the complete class definition of a contract at a specified address and block',
    schema: blockIdAndContractAddressSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getClass(provider, params);
    },
  });

  RpcToolRegistry.push({
    name: 'get_class_at',
    description:
      'Fetch the class definition of a contract at a specific address in the latest state',
    schema: getClassAtSchema,
    execute: async (params: any) => {
      const provider = createProvider();
      return await getClassAt(provider, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: mcpTool[] = [];
  registerTools(tools);
  await registerToolsWithServer(server, tools);
};

const checkEnv = (): boolean => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  if (!rpcUrl) {
    console.error('Missing required environment variable: STARKNET_RPC_URL');
    return false;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();
  if (!checkEnv()) {
    console.error('Failed to initialize RPC Provider');
    process.exit(1);
  }

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet RPC MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
