#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { VesuTool } from './interfaces/index.js';
import dotenv from 'dotenv';

import { depositEarnSchema, withdrawEarnSchema } from './schema/index.js';
import { depositEarnPosition } from './tools/depositService.js';
import { withdrawEarnPosition } from './tools/withdrawService.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-vesu',
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

const registerTools = (VesuToolRegistry: VesuTool[]) => {
  VesuToolRegistry.push({
    name: 'vesu_deposit_earn',
    description: 'Deposit tokens to earn yield on Vesu protocol',
    schema: depositEarnSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await depositEarnPosition(mockAgent as any, params);
    },
  });

  VesuToolRegistry.push({
    name: 'vesu_withdraw_earn',
    description: 'Withdraw tokens from earning position on Vesu protocol',
    schema: withdrawEarnSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await withdrawEarnPosition(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: VesuTool[] = [];
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
  console.error('Starknet Vesu MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
