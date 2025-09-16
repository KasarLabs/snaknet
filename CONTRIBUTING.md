# Creating New MCPs

## Project Structure

```
mcps/your-mcp/
├── src/
│   ├── tools/
│   │   ├── action1.ts      # Individual tool functions
│   │   └── action2.ts
│   ├── schemas/
│   │   └── index.ts        # Zod schemas
│   ├── lib/                # Utils, types, constants, abis
│   ├── interfaces/
│   │   └── index.ts        # mcpTool interface
│   └── index.ts            # MCP server + tool registration
├── bin/
│   └── mcp_starknet-name.js
└── package.json
```

## Tool Functions (src/tools/action.ts)

```typescript
import { z } from 'zod';
import { yourSchema } from '../schemas/index.js';

export const yourAction = async (
  params: z.infer<typeof yourSchema>
): Promise<string> => {
  try {
    // Your logic here
    const result = await doSomething(params);

    return JSON.stringify({
      status: 'success',
      data: result,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

## Schemas (src/schemas/index.ts)

```typescript
import { z } from 'zod';

export const yourSchema = z.object({
  param1: z.string().describe('Parameter description'),
  param2: z.number().optional(),
});
```

## Interface (src/interfaces/index.ts)

```typescript
import { z } from 'zod';

export interface mcpTool {
  name: string;
  description: string;
  schema?: z.ZodObject<any>;
  execute: (params: any) => Promise<any>;
}
```

## MCP Server (src/index.ts)

```typescript
#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { mcpTool } from '@snaknet/core';
import { yourAction } from './tools/action.js';
import { yourSchema } from './schemas/index.js';

const server = new McpServer({
  name: 'starknet-yourname',
  version: '1.0.0',
});

const registerTools = (toolRegistry: mcpTool[]) => {
  toolRegistry.push({
    name: 'your_action_name',
    description: 'What this tool does',
    schema: yourSchema,
    execute: async (params: any) => {
      return await yourAction(params);
    },
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
          content: [{ type: 'text', text: result }],
        };
      });
    } else {
      server.tool(
        tool.name,
        tool.description,
        tool.schema.shape,
        async (params: any) => {
          const result = await tool.execute(params);
          return {
            content: [{ type: 'text', text: result }],
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
  console.error('Your MCP Server running on stdio');
}

main().catch(console.error);
```

## Register in packages/mcps/mcps.json

```json
{
  "yourname": {
    "client": {
      "command": "node",
      "args": ["build/index.js"],
      "transport": "stdio"
    },
    "description": "What this MCP handles",
    "promptInfo": {
      "expertise": "Your domain",
      "tools": ["your_action_name"]
    }
  }
}
```

## Executable (bin/mcp_starknet-yourname.js)

```javascript
#!/usr/bin/env node
import('../build/index.js').catch(console.error);
```

## Environment Variables

The MCP system now supports dynamic environment variable loading. Each MCP can specify required environment variables in the `packages/mcps/mcps.json` configuration.

### Environment Variable Configuration

Environment variables are configured in the `packages/mcps/mcps.json` file under each MCP's `client.env` section:

```json
{
  "your-mcp": {
    "client": {
      "command": "node",
      "args": ["build/index.js"],
      "transport": "stdio",
      "env": {
        "STARKNET_RPC_URL": "",
        "CUSTOM_VARIABLE": ""
      }
    }
  }
}
```

The MCP system will dynamically load and validate these environment variables when building MCP clients, ensuring all required variables are provided before initialization.
