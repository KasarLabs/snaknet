#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import dotenv from 'dotenv';

import { wrapAccountCreationResponse } from './lib/utils/AccountManager.js';
import { accountDetailsSchema } from './schemas/index.js';
import { DeployOZAccount } from './tools/deployAccount.js';
import { CreateOZAccount } from './tools/createAccount.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-openzeppelin',
  version: '0.1.0',
});

// Mock agent interface for MCP compatibility
const createMockAgent = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  if (!rpcUrl) {
    throw new Error('Missing required environment variables: STARKNET_RPC_URL');
  }
  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  return {
    getProvider: () => provider,
  };
};

const registerTools = (OpenZeppelinToolRegistry: mcpTool[]) => {
  OpenZeppelinToolRegistry.push({
    name: 'create_new_openzeppelin_account',
    description:
      'Create a new Open Zeppelin account and return the privateKey/publicKey/contractAddress',
    execute: async () => {
      const response = await CreateOZAccount();
      response;
    },
  });

  OpenZeppelinToolRegistry.push({
    name: 'deploy_existing_openzeppelin_account',
    description:
      'Deploy an existing Open Zeppelin Account return the privateKey/publicKey/contractAddress',
    schema: accountDetailsSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await DeployOZAccount(mockAgent as any, params);
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
  console.error('Starknet OpenZeppelin MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
