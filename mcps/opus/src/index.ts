#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { RpcProvider, Account } from 'starknet';

import { OpusTool } from "./interfaces/index.js";
import dotenv from "dotenv";

import {
  borrowTroveSchema,
  collateralActionSchema,
  getTroveHealthSchema,
  getUserTrovesSchema,
  openTroveSchema,
  repayTroveSchema,
} from './schemas/index.js';
import { openTrove } from './actions/openTrove.js';
import {
  getBorrowFee,
  getTroveHealth,
  getUserTroves,
} from './actions/getters.js';
import { depositTrove } from './actions/depositTrove.js';
import { withdrawTrove } from './actions/withdrawTrove.js';
import { borrowTrove } from './actions/borrowTrove.js';
import { repayTrove } from './actions/repayTrove.js';

dotenv.config();

const server = new McpServer({
  name: "starknet-opus",
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

const registerTools = (OpusToolRegistry: OpusTool[]) => {
  OpusToolRegistry.push({
    name: 'open_trove',
    description: 'Open a Trove on Opus',
    schema: openTroveSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await openTrove(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'get_user_troves',
    description: 'Get trove IDs for an address on Opus',
    schema: getUserTrovesSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getUserTroves(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'get_trove_health',
    description: 'Get the health of a trove on Opus',
    schema: getTroveHealthSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getTroveHealth(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'get_borrow_fee',
    description: 'Get the current borrow fee for Opus',
    execute: async () => {
      const mockAgent = createMockAgent();
      return await getBorrowFee(mockAgent as any);
    },
  });

  OpusToolRegistry.push({
    name: 'deposit_trove',
    description: 'Deposit collateral to a Trove on Opus',
    schema: collateralActionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await depositTrove(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'withdraw_trove',
    description: 'Withdraw collateral from a Trove on Opus',
    schema: collateralActionSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await withdrawTrove(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'borrow_trove',
    description: 'Borrow CASH for a Trove on Opus',
    schema: borrowTroveSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await borrowTrove(mockAgent as any, params);
    },
  });

  OpusToolRegistry.push({
    name: 'repay_trove',
    description: 'Repay CASH for a Trove on Opus',
    schema: repayTroveSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await repayTrove(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: OpusTool[] = [];
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
  console.error("Starknet Opus MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
