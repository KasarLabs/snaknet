#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { mcpTool } from './interfaces/index.js';
import dotenv from 'dotenv';

import {
  contractAddressSchema,
  launchOnEkuboSchema,
  createMemecoinSchema,
} from './schemas/index.js';
import { getLockedLiquidity } from './tools/getLockedLiquidity.js';
import { isMemecoin } from './tools/isMemecoin.js';
import { createMemecoin } from './tools/createMemecoin.js';
import { launchOnEkubo } from './tools/launchOnEkubo.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-unruggable',
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

const registerTools = (UnruggableToolRegistry: mcpTool[]) => {
  UnruggableToolRegistry.push({
    name: 'is_memecoin',
    description: 'Check if address is a memecoin',
    schema: contractAddressSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await isMemecoin(mockAgent as any, params);
    },
  });

  UnruggableToolRegistry.push({
    name: 'get_locked_liquidity',
    description: 'Get locked liquidity info for token',
    schema: contractAddressSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      const result = await getLockedLiquidity(mockAgent as any, params);
      return JSON.stringify(result);
    },
  });

  UnruggableToolRegistry.push({
    name: 'create_memecoin',
    description: 'Create a new memecoin using the Unruggable Factory',
    schema: createMemecoinSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      const result = await createMemecoin(mockAgent as any, params);
      return JSON.stringify(result);
    },
  });

  UnruggableToolRegistry.push({
    name: 'launch_on_ekubo',
    description: 'Launch a memecoin on Ekubo DEX with concentrated liquidity',
    schema: launchOnEkuboSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await launchOnEkubo(mockAgent as any, params);
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
  console.error('Starknet Unruggable MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
