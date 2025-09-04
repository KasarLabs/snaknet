#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { RpcProvider, Account } from 'starknet';

import { Erc721Tool } from './interfaces/index.js';
import dotenv from 'dotenv';

import {
  ownerOfSchema,
  transferFromSchema,
  getBalanceSchema,
  approveSchema,
  isApprovedForAllSchema,
  getApprovedSchema,
  safeTransferFromSchema,
  setApprovalForAllSchema,
  deployERC721Schema,
  getOwnBalanceSchema,
  transferSchema,
} from './schemas/schema.js';
import { getOwner } from './actions/ownerOf.js';
import { transferFrom, transfer } from './actions/transferFrom.js';
import { getBalance, getOwnBalance } from './actions/balanceOf.js';
import { approve } from './actions/approve.js';
import { isApprovedForAll } from './actions/isApprovedForAll.js';
import { getApproved } from './actions/getApproved.js';
import { safeTransferFrom } from './actions/safeTransferFrom.js';
import { setApprovalForAll } from './actions/setApprovalForAll.js';
import { deployERC721Contract } from './actions/deployERC721.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-erc721',
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

const registerTools = (Erc721ToolRegistry: Erc721Tool[]) => {
  Erc721ToolRegistry.push({
    name: 'erc721_owner_of',
    description: 'Get the owner of a specific NFT',
    schema: ownerOfSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getOwner(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_get_balance',
    description: 'Get the balance of NFTs for a given wallet address',
    schema: getBalanceSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getBalance(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_get_own_balance',
    description: 'Get the balance of NFTs in your wallet',
    schema: getOwnBalanceSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getOwnBalance(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_is_approved_for_all',
    description:
      'Check if an operator is approved for all NFTs of a given owner',
    schema: isApprovedForAllSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await isApprovedForAll(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_get_approved',
    description: 'Get the approved address for a specific NFT ERC721',
    schema: getApprovedSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await getApproved(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_transfer_from',
    description: 'Transfer a NFT from one address to another',
    schema: transferFromSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await transferFrom(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_transfer',
    description: 'Transfer a NFT to a specific address',
    schema: transferSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await transfer(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_approve',
    description: 'Approve an address to manage a specific NFT erc721',
    schema: approveSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await approve(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_safe_transfer_from',
    description:
      'Safely transfer an NFT from one address to another with additional data',
    schema: safeTransferFromSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await safeTransferFrom(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'erc721_set_approval_for_all',
    description:
      'Set or revoke approval for an operator to manage all NFTs of the caller',
    schema: setApprovalForAllSchema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await setApprovalForAll(mockAgent as any, params);
    },
  });

  Erc721ToolRegistry.push({
    name: 'deploy_erc721',
    description:
      'Create and deploy a new ERC721 contract, returns the address of the deployed contract',
    schema: deployERC721Schema,
    execute: async (params: any) => {
      const mockAgent = createMockAgent();
      return await deployERC721Contract(mockAgent as any, params);
    },
  });
};

export const RegisterToolInServer = async () => {
  const tools: Erc721Tool[] = [];
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
  console.error('Starknet ERC721 MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
