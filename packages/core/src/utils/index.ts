import { mcpTool } from '../interfaces/index.js';

/**
 * Register MCP tools with a server instance
 * @param server - The MCP server instance
 * @param tools - Array of mcpTool objects to register
 */
export const registerToolsWithServer = async (
  server: any,
  tools: mcpTool[]
): Promise<void> => {
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
