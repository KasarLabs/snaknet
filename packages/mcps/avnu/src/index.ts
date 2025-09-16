#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { mcpTool } from './interfaces/index.js';
import dotenv from 'dotenv';

import { routeSchema, swapSchema } from './schemas/index.js';
import { swapTokens } from './tools/swap.js';
import { getRoute } from './tools/fetchRoute.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-avnu',
  version: '1.0.0',
});

// Mock agent interface for MCP compatibility
const createMockAgent = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;

  if (!rpcUrl || !privateKey || !accountAddress) {
    throw new Error(
      'Missing required environment variables: STARKNET_RPC_URL, STARKNET_PRIVATE_KEY, STARKNET_ACCOUNT_ADDRESS'
    );
  }

  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  const account = new Account(provider, accountAddress, privateKey);

  return {
    getProvider: () => provider,
    getAccountCredentials: () => ({
      accountPublicKey: accountAddress,
      accountPrivateKey: privateKey,
    }),
    getAccount: () => account,
  };
};

const registerTools = (AvnuToolRegistry: mcpTool[]) => {
  AvnuToolRegistry.push({
    name: 'avnu_swap_tokens',
    description: 'Swap a specified amount of one token for another token',
    schema: swapSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await swapTokens(mockAgent as any, params);
    },
  });

  AvnuToolRegistry.push({
    name: 'avnu_get_route',
    description: 'Get a specific route',
    schema: routeSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getRoute(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: mcpTool[] = [];
  registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute({});
        return {
          content: [
            {
              type: 'text',
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
          const result = await tool.execute(params);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result),
              },
            ],
          };
        }
      );
    }
  }
};

async function main() {
  const transport = new StdioServerTransport();

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet AVNU MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
