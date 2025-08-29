#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RpcProvider, Account } from 'starknet';

import { ArtPeaceTool } from "./interfaces/index.js";
import dotenv from "dotenv";

import { placePixel } from './actions/placePixel.js';
import { placePixelSchema } from './schema/index.js';

dotenv.config();

const server = new McpServer({
  name: "starknet-artpeace",
  version: "1.0.0",
});

// Mock agent interface for MCP compatibility
const createMockAgent = () => {
  const rpcUrl = process.env.STARKNET_RPC_URL;
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;

  if (!rpcUrl || !accountAddress || !privateKey) {
    throw new Error("Missing required environment variables: STARKNET_RPC_URL, STARKNET_ACCOUNT_ADDRESS, STARKNET_PRIVATE_KEY");
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

const registerTools = (ArtPeaceToolRegistry: ArtPeaceTool[]) => {
  ArtPeaceToolRegistry.push({
    name: 'place_pixel',
    description: 'Places a pixel, all parameters are optional',
    schema: placePixelSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await placePixel(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: ArtPeaceTool[] = [];
  registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute({});
        return {
          content: [
            {
              type: "text",
              text: result,
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
                text: result,
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
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;

  if (!rpcUrl) {
    console.error("Missing required environment variable: STARKNET_RPC_URL");
    return false;
  }
  if (!accountAddress) {
    console.error("Missing required environment variable: STARKNET_ACCOUNT_ADDRESS");
    return false;
  }
  if (!privateKey) {
    console.error("Missing required environment variable: STARKNET_PRIVATE_KEY");
    return false;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();
  if (!checkEnv()) {
    console.error("Failed to initialize ArtPeace Server");
    process.exit(1);
  }
  
  await RegisterToolInServer();
  await server.connect(transport);
  console.error("Starknet ArtPeace MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
