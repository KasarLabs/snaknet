#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import dotenv from 'dotenv';
import { mcpTool, registerToolsWithServer } from '@snaknet/core';
import packageJson from '../package.json' with { type: 'json' };

dotenv.config();

const server = new McpServer({
  name: 'starknet-test-mcp',
  version: packageJson.version,
});

const registerTools = (testToolRegistry: mcpTool[]) => {
  testToolRegistry.push({
    name: 'test_hello',
    description: 'Test tool that returns hello world',
    execute: async () => {
      return JSON.stringify({
        status: 'success',
        data: { message: 'Hello from test MCP!' },
      });
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
  console.error('Test MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
