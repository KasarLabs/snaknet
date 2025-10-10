#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import dotenv from 'dotenv';

import {
  simulateInvokeTransaction,
  simulateDeployAccountTransaction,
  simulateDeployTransaction,
  simulateDeclareTransaction,
} from './tools/simulateTransaction.js';

import {
  simulateInvokeTransactionSchema,
  simulateDeployAccountTransactionSchema,
  simulateDeployTransactionSchema,
  simulateDeclareTransactionSchema,
} from './schemas/index.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-transaction',
  version: '0.1.0',
});

// Mock agent interface for MCP compatibility
const createMockAgent = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;

  if (!rpcUrl || !accountAddress || !privateKey) {
    throw new Error(
      'Missing required environment variables: STARKNET_RPC_URL, STARKNET_ACCOUNT_ADDRESS, STARKNET_PRIVATE_KEY'
    );
  }

  const provider = new RpcProvider({ nodeUrl: rpcUrl });

  return {
    getProvider: () => provider,
    getAccountCredentials: () => ({
      accountPublicKey: accountAddress,
      accountPrivateKey: privateKey,
    }),
  };
};

const registerTools = (TransactionToolRegistry: mcpTool[]) => {
  TransactionToolRegistry.push({
    name: 'simulate_transaction',
    description: 'Simulate a transaction without executing it',
    schema: simulateInvokeTransactionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await simulateInvokeTransaction(mockAgent as any, params);
    },
  });

  TransactionToolRegistry.push({
    name: 'simulate_deploy_transaction',
    description: 'Simulate Deploy transaction',
    schema: simulateDeployTransactionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await simulateDeployTransaction(mockAgent as any, params);
    },
  });

  TransactionToolRegistry.push({
    name: 'simulate_declare_transaction',
    description: 'Simulate Declare transaction',
    schema: simulateDeclareTransactionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await simulateDeclareTransaction(mockAgent as any, params);
    },
  });

  TransactionToolRegistry.push({
    name: 'simulate_deploy_account_transaction',
    description: 'Simulate Deploy Account transaction',
    schema: simulateDeployAccountTransactionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await simulateDeployAccountTransaction(mockAgent as any, params);
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
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;

  if (!rpcUrl) {
    console.error('Missing required environment variable: STARKNET_RPC_URL');
    return false;
  }
  if (!accountAddress) {
    console.error(
      'Missing required environment variable: STARKNET_ACCOUNT_ADDRESS'
    );
    return false;
  }
  if (!privateKey) {
    console.error(
      'Missing required environment variable: STARKNET_PRIVATE_KEY'
    );
    return false;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();
  if (!checkEnv()) {
    console.error('Failed to initialize Transaction Server');
    process.exit(1);
  }

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet Transaction MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
