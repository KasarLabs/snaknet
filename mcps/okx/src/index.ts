#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { OkxTool } from './interfaces/index.js';
import dotenv from 'dotenv';

import { wrapAccountCreationResponse } from './utils/AccountManager.js';
import { accountDetailsSchema } from './schemas/schema.js';
import { DeployOKXAccount } from './tools/deployAccount.js';
import { CreateOKXAccount } from './tools/createAccount.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-okx',
  version: '1.0.0',
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

const registerTools = (OkxToolRegistry: OkxTool[]) => {
  OkxToolRegistry.push({
    name: 'create_new_okx_account',
    description:
      'Create a new OKX account and return the privateKey/publicKey/contractAddress',
    execute: async () => {
      const response = await CreateOKXAccount();
      return wrapAccountCreationResponse(response);
    },
  });

  OkxToolRegistry.push({
    name: 'deploy_existing_okx_account',
    description:
      'Deploy an existing OKX Account return the privateKey/publicKey/contractAddress',
    schema: accountDetailsSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await DeployOKXAccount(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: OkxTool[] = [];
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
  console.error('Starknet OKX MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
