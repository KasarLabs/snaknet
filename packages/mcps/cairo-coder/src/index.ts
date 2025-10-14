#!/usr/bin/env node

import "dotenv/config";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";

// ... reste du code inchangé
/**
 * Represents a message in the Cairo Coder conversation
 */
interface CairoCoderMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Request payload for the Cairo Coder API
 */
interface CairoCoderRequest {
  messages: CairoCoderMessage[];
}

/**
 * Response from the Cairo Coder API
 */
interface CairoCoderResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

/**
 * MCP Server implementation for Cairo Coder API integration
 * Provides AI-powered assistance for Cairo and Starknet development
 */
class CairoCoderMCPServer {
  private server: Server;
  private apiKey: string;
  private apiUrl: string;
  private isLocalMode: boolean;

  /**
   * Initializes the Cairo Coder MCP Server
   * @throws {Error} If CAIRO_CODER_API_KEY environment variable is not set when using public API
   */
  constructor() {
    this.server = new Server({
      name: "cairo-coder-mcp",
      version: "1.0.0",
      capabilities: {
        tools: {},
      },
    });

    // Check if local endpoint is specified
    const localEndpoint = process.env.CAIRO_CODER_API_ENDPOINT;

    if (localEndpoint) {
      // Local mode: use custom endpoint, no API key required
      this.isLocalMode = true;
      this.apiUrl = `${localEndpoint}/v1/chat/completions`;
      this.apiKey = "";
      console.error(
        `Cairo Coder MCP server configured for local mode: ${this.apiUrl}`,
      );
    } else {
      // Public API mode: use official endpoint, API key required
      this.isLocalMode = false;
      this.apiUrl = "https://api.cairo-coder.com/v1/chat/completions";
      this.apiKey = process.env.CAIRO_CODER_API_KEY || "";

      if (!this.apiKey) {
        console.error(
          "Error: CAIRO_CODER_API_KEY environment variable is required when using public API",
        );
        process.exit(1);
      }
      console.error("Cairo Coder MCP server configured for public API mode");
    }

    this.setupToolHandlers();
    this.setupErrorHandling();
  }

  /**
   * Sets up the tool handlers for the MCP server
   * Configures the assist_with_cairo tool for Cairo/Starknet development assistance
   */
  private setupToolHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "assist_with_cairo",
            description: `Provides assistance with Cairo and Starknet development tasks through AI-powered analysis.
  
  Call this tool when the user's request involves **writing, refactoring, implementing from scratch, or completing specific parts (like TODOs)** of Cairo code or smart contracts.
  
  The tool analyzes the query and context against Cairo/Starknet best practices and documentation, returning helpful information to generate accurate code or explanations.
  
  This tool should also be called to get a better understanding of Starknet's ecosystem, features, and capacities.`,
            inputSchema: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description:
                    "The user's question regarding Cairo and Starknet development. Try to be as specific as possible for better results (e.g., 'Using OpenZeppelin to build an ERC20' rather than just 'ERC20').",
                },
                codeSnippets: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "Optional: Code snippets for context. This will help the tool understand the user's intent and provide more accurate answers. Provide as much relevant code as possible to fit the user's request.",
                },
                history: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                  description:
                    "Optional: The preceding conversation history. This can help the tool understand the context of the discussion and provide more accurate answers.",
                },
              },
              required: ["query"],
            },
          } as Tool,
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === "assist_with_cairo") {
        return await this.handleCairoAssistance(
          args as {
            query: string;
            codeSnippets?: string[];
            history?: string[];
          },
        );
      }

      throw new Error(`Unknown tool: ${name}`);
    });
  }

  /**
   * Handles Cairo assistance requests by calling the Cairo Coder API
   * @param args - The arguments containing query, optional code snippets, and conversation history
   * @returns The response from the Cairo Coder API or an error message
   */
  private async handleCairoAssistance(args: {
    query: string;
    codeSnippets?: string[];
    history?: string[];
  }) {
    try {
      const { query, codeSnippets, history } = args;

      if (!query) {
        throw new Error("Query parameter is required");
      }

      let contextualMessage = query;

      if (codeSnippets && codeSnippets.length > 0) {
        contextualMessage += `\n\nCode snippets for context:\n${codeSnippets.join("\n\n")}`;
      }

      if (history && history.length > 0) {
        contextualMessage = `Previous conversation context:\n${history.join("\n")}\n\nCurrent query: ${contextualMessage}`;
      }

      const requestBody: CairoCoderRequest = {
        messages: [
          {
            role: "user",
            content: contextualMessage,
          },
        ],
      };

      // Prepare headers based on mode
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        mcp: "true",
      };

      // Only add API key header in public API mode
      if (!this.isLocalMode && this.apiKey) {
        headers["x-api-key"] = this.apiKey;
      }

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      const data = (await response.json()) as CairoCoderResponse;

      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response received from Cairo Coder API");
      }

      const assistantResponse = data.choices[0].message.content;

      return {
        content: [
          {
            type: "text",
            text: assistantResponse,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  }

  /**
   * Sets up error handling for the server
   * Configures error logging and graceful shutdown on SIGINT
   */
  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  /**
   * Starts the MCP server with stdio transport
   * @throws {Error} If the server fails to start
   */
  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    console.error("Cairo Coder MCP server running on stdio");
    await this.server.connect(transport);
  }
}

/**
 * Main entry point for the application
 * Creates and starts the Cairo Coder MCP server
 */
async function main() {
  const server = new CairoCoderMCPServer();
  await server.run();
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

export default CairoCoderMCPServer;
