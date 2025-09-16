#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import { z } from 'zod';

import { graph } from './graph/graph.js';
import { logger } from './utils/index.js';
import { HumanMessage } from '@langchain/core/messages';

const performStarknetActionsSchema = z.object({
  userInput: z.string().describe('The actions that the user want to do'),
});
type performStarknetActionsInput = z.infer<typeof performStarknetActionsSchema>;
type envInput = {
  [key: string]: string | undefined;
};

export const performStarknetActions = async (
  env: envInput,
  input: performStarknetActionsInput
) => {
  logger.info('Graph execution started', { userInput: input.userInput, env });

  try {
    const config = { configurable: { thread_id: `user-${Date.now()}` } };

    const result = await graph.invoke(
      {
        messages: [new HumanMessage(input.userInput)],
        mcpEnvironment: env,
      },
      config
    );

    const finalMessage = result.messages[result.messages.length - 1];

    logger.error('Graph execution completed!!!!!!!!!!!!!!!!!!');

    return {
      status: 'success',
      response: finalMessage.content,
    };
  } catch (error) {
    logger.error('Graph execution failed', error);
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

interface SnaknetTool<P = any> {
  name: string;
  description: string;
  schema?: z.AnyZodObject;
  execute: (env: envInput, input: P) => Promise<unknown>;
}

export const registerTools = (snaknetToolRegistry: SnaknetTool[]) => {
  snaknetToolRegistry.push({
    name: 'perform_starknet_actions',
    description: 'Call snaknet agent to perform starknet actions',
    schema: performStarknetActionsSchema,
    execute: performStarknetActions,
  });
};

const server = new McpServer({
  name: 'snakknet',
  version: '1.0.0',
});

export const RegisterToolInServer = async (env: envInput) => {
  const tools: SnaknetTool[] = [];
  await registerTools(tools);
  for (const tool of tools) {
    if (!tool.schema) {
      server.tool(tool.name, tool.description, async () => {
        const result = await tool.execute(env, {});
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
        async (input: any, extra: any) => {
          const result = await tool.execute(env, input);
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

// Required environment variables for the main MCP
const REQUIRED_ENV_VARS = [
  'STARKNET_RPC_URL',
  'STARKNET_ACCOUNT_ADDRESS',
  'STARKNET_PRIVATE_KEY',
  'ANTHROPIC_API_KEY'
] as const;

function validateRequiredEnvironmentVariables(): envInput {
  const env: envInput = {};
  const missingVars: string[] = [];

  // Check required variables
  REQUIRED_ENV_VARS.forEach(varName => {
    if (process.env[varName]) {
      env[varName] = process.env[varName];
    } else {
      missingVars.push(varName);
    }
  });

  // Load additional STARKNET_* variables if they exist
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('STARKNET_') && process.env[key] && !env[key]) {
      env[key] = process.env[key];
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease set these environment variables before starting the MCP server.');
    console.error('Example:');
    console.error('export STARKNET_RPC_URL="https://starknet-mainnet.public.blastapi.io"');
    console.error('export STARKNET_ACCOUNT_ADDRESS="0x..."');
    console.error('export STARKNET_PRIVATE_KEY="0x..."');
    console.error('export ANTHROPIC_API_KEY="sk-..."');
    process.exit(1);
  }

  console.error('✅ All required environment variables are set');
  console.error(`   - STARKNET_RPC_URL: ${env.STARKNET_RPC_URL?.substring(0, 30)}...`);
  console.error(`   - STARKNET_ACCOUNT_ADDRESS: ${env.STARKNET_ACCOUNT_ADDRESS?.substring(0, 10)}...`);
  console.error(`   - STARKNET_PRIVATE_KEY: ***hidden***`);
  console.error(`   - ANTHROPIC_API_KEY: ***hidden***`);

  return env;
}

async function main() {
  const transport = new StdioServerTransport();

  // Validate and load all required environment variables
  const env = validateRequiredEnvironmentVariables();

  await RegisterToolInServer(env);
  await server.connect(transport);
  console.error('Starknet Argent MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
