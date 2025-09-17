#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider } from 'starknet';

import dotenv from 'dotenv';

import { mcpTool, registerToolsWithServer } from '@snaknet/core';

dotenv.config();

const server = new McpServer({
  name: 'd-mcp',
  version: '0.1.0',
});

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

const registerTools = (DToolRegistry: mcpTool[]) => {
  // Tools will be added here
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
  console.error('Starknet D MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
