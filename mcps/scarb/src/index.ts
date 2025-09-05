#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import dotenv from 'dotenv';

import { ScarbTool } from './interfaces/index.js';
import { initProject } from './actions/init.js';
import { buildProject } from './actions/build.js';
import { executeProgram } from './actions/execute.js';
import { installScarb, installScarbSchema } from './actions/install.js';
import { proveProgram } from './actions/prove.js';
import { verifyProgram } from './actions/verify.js';
import {
  initProjectSchema,
  buildProjectSchema,
  executeProgramSchema,
  proveProgramSchema,
  verifyProgramSchema,
} from './schema/index.js';

dotenv.config();

const server = new McpServer({
  name: 'starknet-scarb',
  version: '1.0.0',
});

const registerTools = (ScarbToolRegistry: ScarbTool[]) => {
  ScarbToolRegistry.push({
    name: 'install_scarb',
    description:
      'Install Scarb Cairo toolchain with optional version specification',
    schema: installScarbSchema,
    execute: installScarb,
  });

  ScarbToolRegistry.push({
    name: 'init_project',
    description:
      'Initialize a new Scarb project with specified name and options',
    schema: initProjectSchema,
    execute: initProject,
  });

  ScarbToolRegistry.push({
    name: 'build_project',
    description: 'Build a Scarb project with specified build options',
    schema: buildProjectSchema,
    execute: buildProject,
  });

  ScarbToolRegistry.push({
    name: 'execute_program',
    description: 'Execute a Cairo program with optional function and arguments',
    schema: executeProgramSchema,
    execute: executeProgram,
  });

  ScarbToolRegistry.push({
    name: 'prove_program',
    description:
      'Generate a proof for a Cairo program execution using Stone prover',
    schema: proveProgramSchema,
    execute: proveProgram,
  });

  ScarbToolRegistry.push({
    name: 'verify_program',
    description: 'Verify a proof generated for a Cairo program',
    schema: verifyProgramSchema,
    execute: verifyProgram,
  });
};

export const RegisterToolInServer = async () => {
  const tools: ScarbTool[] = [];
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

async function main() {
  const transport = new StdioServerTransport();

  await RegisterToolInServer();
  await server.connect(transport);
  console.error('Starknet Scarb MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
