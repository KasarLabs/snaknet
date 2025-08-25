#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RpcProvider } from "starknet";

import { RpcTool } from "./interfaces/index.js";
import dotenv from "dotenv";

import { getSpecVersion } from './actions/getSpecVersion.js';
import { getBlockWithTxHashes } from './actions/getBlockWithTxHashes.js';
import { getBlockWithReceipts } from './actions/getBlockWithReceipts.js';
import { getTransactionStatus } from './actions/getTransactionStatus.js';
import { getClass } from './actions/getClass.js';
import { getChainId } from './actions/getChainId.js';
import { getSyncingStats } from './actions/getSyncingStats.js';
import { getBlockNumber } from './actions/getBlockNumber.js';
import { getBlockTransactionCount } from './actions/getBlockTransactionCount.js';
import { getStorageAt } from './actions/getStorageAt.js';
import { getClassAt } from './actions/getClassAt.js';
import { getClassHashAt } from './actions/getClassHashAt.js';
import {
  getStorageAtSchema,
  blockIdSchema,
  blockIdAndContractAddressSchema,
  getClassAtSchema,
  getClassHashAtSchema,
  transactionHashSchema,
  emptyInputSchema,
} from './schema/index.js';

dotenv.config();

const server = new McpServer({
  name: "starknet-rpc",
  version: "1.0.0",
});


const registerTools = (RpcToolRegistry: RpcTool[]) => {
  RpcToolRegistry.push({
    name: 'get_chain_id',
    description:
      'Retrieve the unique identifier (chain ID) of the Starknet network',
    schema: emptyInputSchema,
    execute: getChainId,
  });

  RpcToolRegistry.push({
    name: 'get_syncing_status',
    description: 'Retrieve the syncing status of the Starknet node',
    schema: emptyInputSchema,
    execute: getSyncingStats,
  });

  // Add remaining tools from createTools2
  RpcToolRegistry.push({
    name: 'get_class_hash',
    description:
      'Retrieve the unique class hash for a contract at a specific address',
    schema: getClassHashAtSchema,
    execute: getClassHashAt,
  });

  RpcToolRegistry.push({
    name: 'get_spec_version',
    description: 'Get the current spec version from the Starknet RPC provider',
    schema: emptyInputSchema,
    execute: getSpecVersion,
  });

  RpcToolRegistry.push({
    name: 'get_block_with_tx_hashes',
    description:
      'Retrieve the details of a block, including transaction hashes',
    schema: blockIdSchema,
    execute: getBlockWithTxHashes,
  });

  RpcToolRegistry.push({
    name: 'get_block_with_receipts',
    description: 'Fetch block details with transaction receipts',
    schema: blockIdSchema,
    execute: getBlockWithReceipts,
  });

  RpcToolRegistry.push({
    name: 'get_transaction_status',
    description: 'Fetch transaction status by hash',
    schema: transactionHashSchema,
    execute: getTransactionStatus,
  });

  // Register blockchain query tools
  RpcToolRegistry.push({
    name: 'get_block_number',
    description: 'Get the current block number from the Starknet network',
    schema: emptyInputSchema,
    execute: getBlockNumber,
  });

  RpcToolRegistry.push({
    name: 'get_block_transaction_count',
    description: 'Get the number of transactions in a specific block',
    schema: blockIdSchema,
    execute: getBlockTransactionCount,
  });

  RpcToolRegistry.push({
    name: 'get_storage_at',
    description: 'Get the storage value at a specific slot for a contract',
    schema: getStorageAtSchema,
    execute: getStorageAt,
  });

  // Register contract-related tools
  RpcToolRegistry.push({
    name: 'get_class',
    description:
      'Retrieve the complete class definition of a contract at a specified address and block',
    schema: blockIdAndContractAddressSchema,
    execute: getClass,
  });

  RpcToolRegistry.push({
    name: 'get_class_at',
    description:
      'Fetch the class definition of a contract at a specific address in the latest state',
    schema: getClassAtSchema,
    execute: getClassAt,
  });
};


export const RegisterToolInServer = async (provider: RpcProvider) => {
  const tools: RpcTool[] = [];
  await registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute(provider, {});
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      });
    } else {
      server.tool(
        tool.name,
        tool.description,
        tool.schema.shape,
        async (params: any, extra: any) => {
          const result = await tool.execute(provider, params);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result),
              },
            ],
          };
        }
      );
    }
  }
};

const checkEnv = (): boolean => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  if (!rpcUrl) {
    console.error("Missing required environment variable: STARKNET_RPC_URL");
    return false;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();
  if (!checkEnv()) {
    console.error("Failed to initialize RPC Provider");
    process.exit(1);
  }
  
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  
  await RegisterToolInServer(provider);
  await server.connect(transport);
  console.error("Starknet RPC MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});