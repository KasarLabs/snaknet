#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RpcProvider, Account } from 'starknet';

import { FibrousTool } from "./interfaces/index.js";
import dotenv from "dotenv";

import { swapSchema, batchSwapSchema, routeSchema, RouteSchemaType } from './schema/index.js';
import { swapTokensFibrous } from './actions/swap.js';
import { batchSwapTokens } from './actions/batchSwap.js';
import { getRouteFibrous } from './actions/fetchRoute.js';

dotenv.config();

const server = new McpServer({
  name: "starknet-fibrous",
  version: "1.0.0",
});

// Mock agent interface for MCP compatibility
const createMockAgent = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;

  if (!rpcUrl || !privateKey || !accountAddress) {
    throw new Error("Missing required environment variables: STARKNET_RPC_URL, STARKNET_PRIVATE_KEY, STARKNET_ACCOUNT_ADDRESS");
  }

  const provider = new RpcProvider({ nodeUrl: rpcUrl });
  const account = new Account(provider, accountAddress, privateKey);

  return {
    getProvider: () => provider,
    getAccountCredentials: () => ({ address: accountAddress, privateKey }),
    getAccount: () => account,
  };
};

const registerTools = (FibrousToolRegistry: FibrousTool[]) => {
  FibrousToolRegistry.push({
    name: 'fibrous_swap',
    description: 'Swap a token for another token',
    schema: swapSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await swapTokensFibrous(mockAgent as any, params);
    },
  });

  FibrousToolRegistry.push({
    name: 'fibrous_batch_swap',
    description: 'Swap multiple tokens for another token',
    schema: batchSwapSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await batchSwapTokens(mockAgent as any, params);
    },
  });

  FibrousToolRegistry.push({
    name: 'fibrous_get_route',
    description: 'Get a specific route for swapping tokens',
    schema: routeSchema,
    execute: async (params: RouteSchemaType) => {
      const result = await getRouteFibrous(params);
      return JSON.stringify(result);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: FibrousTool[] = [];
  registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute({});
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
          const result = await tool.execute(params);
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

async function main() {
  const transport = new StdioServerTransport();
  
  await RegisterToolInServer();
  await server.connect(transport);
  console.error("Starknet Fibrous MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
