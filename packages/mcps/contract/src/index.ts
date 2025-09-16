#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import dotenv from 'dotenv';

import { mcpTool } from './interfaces/index.js';
import { declareContract } from './tools/declareContract.js';
import { deployContract } from './tools/deployContract.js';
import { getConstructorParams } from './tools/getConstructorParams.js';
import {
  declareContractSchema,
  deployContractSchema,
  getConstructorParamsSchema,
} from './schemas/index.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-contract',
  version: '1.0.0',
});

const registerTools = (ContractToolRegistry: mcpTool[]) => {
  ContractToolRegistry.push({
    name: 'declare_contract',
    description: 'Declare a Starknet contract using sierra and casm file paths',
    schema: declareContractSchema,
    execute: declareContract,
  });

  ContractToolRegistry.push({
    name: 'deploy_contract',
    description:
      'Deploy a declared Starknet contract using sierra and casm file paths',
    schema: deployContractSchema,
    execute: deployContract,
  });

  ContractToolRegistry.push({
    name: 'get_constructor_params',
    description: 'Get constructor parameters from a contract sierra file',
    schema: getConstructorParamsSchema,
    execute: getConstructorParams,
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
                type: 'text',
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
  const accountAddress = process.env.STARKNET_ACCOUNT_ADDRESS;
  const privateKey = process.env.STARKNET_PRIVATE_KEY;
  const rpcUrl = process.env.STARKNET_RPC_URL;

  if (!accountAddress || !privateKey || !rpcUrl) {
    console.error(
      'Missing required environment variables: STARKNET_ACCOUNT_ADDRESS, STARKNET_PRIVATE_KEY, STARKNET_RPC_URL'
    );
    return false;
  }
  return true;
};

async function main() {
  const transport = new StdioServerTransport();

  if (!checkEnv()) {
    console.error(
      'Failed to initialize Contract Manager - missing environment variables'
    );
    process.exit(1);
  }

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet Contract MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
