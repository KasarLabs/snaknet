#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RpcProvider, Account } from 'starknet';

import { ArgentTool } from "./interfaces/index.js";
import dotenv from "dotenv";

import { wrapAccountCreationResponse } from './utils/AccountManager.js';
import { CreateArgentAccount } from './actions/createAccount.js';
import { DeployArgentAccount } from './actions/deployAccount.js';
import { accountDetailsSchema } from './schemas/schema.js';

dotenv.config();

const server = new McpServer({
  name: "starknet-argent",
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
    getAccountCredentials: () => ({ accountPublicKey: accountAddress, accountPrivateKey: privateKey }),
    getAccount: () => account,
  };
};

const registerTools = (ArgentToolRegistry: ArgentTool[]) => {
  ArgentToolRegistry.push({
    name: 'create_new_argent_account',
    description:
      'Creates a new Argent account and return the privateKey/publicKey/contractAddress',
    execute: async () => {
      const response = await CreateArgentAccount();
      return wrapAccountCreationResponse(response);
    },
  });

  ArgentToolRegistry.push({
    name: 'deploy_existing_argent_account',
    description:
      'Deploy an existing Argent Account return the privateKey/publicKey/contractAddress',
    schema: accountDetailsSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await DeployArgentAccount(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: ArgentTool[] = [];
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
  console.error("Starknet Argent MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});