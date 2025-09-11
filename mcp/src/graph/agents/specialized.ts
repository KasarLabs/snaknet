import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { getMCPClientConfig } from "../mcps/utilities.js";
import { GraphAnnotation } from "../graph.js";
import { logger } from '../../utils/index.js'
import { MCPEnvironment } from "../mcps/interfaces.js";

async function specializedAgent(mcpServerName: string, env: MCPEnvironment | undefined) {
    try {
        const client = new MultiServerMCPClient({
            mcpServers: {
                [mcpServerName]: getMCPClientConfig(mcpServerName, env)
            }
        });

        const tools = await client.getTools();
        logger.error(
            `Loaded ${tools.length} MCP tools: ${tools
                .map((tool) => tool.name)
                .join(", ")}`, {}
        );
        
        const model = new ChatAnthropic({
            model: "claude-3-5-sonnet-latest",
            temperature: 0
        }).bindTools(tools);
        
        const toolNode = new ToolNode(tools);
        
        return { model, toolNode };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const specializedNode = async (state: typeof GraphAnnotation.State) => {
    logger.error(`Specialized node executing for agent: ${state.next}`, {});
 
    try {
        const { model, toolNode } = await specializedAgent(state.next, state.mcpEnvironment);
        
        const response = await model.invoke(state.messages);
        
        if (response.tool_calls && response.tool_calls.length > 0) {
            logger.error(`Tool calls detected: ${response.tool_calls.map(tc => tc.name).join(', ')}`, {});
            const toolResults = await toolNode.invoke({ messages: [...state.messages, response] });
            const finalResponse = await model.invoke([
                ...state.messages, 
                response, 
                ...toolResults.messages
            ]);
            
            logger.error('Agent response with tools completed', {
                agent: state.next,
                toolCalls: response.tool_calls,
                toolResults: toolResults,
                toolArgs: response.tool_calls[0].args,
                toolArgsType: typeof response.tool_calls[0].args
            });
            
            return {
                messages: [new HumanMessage({ content: finalResponse.content, name: state.next })]
            };
        } else {
            logger.error('Agent response without tools', {
                agent: state.next,
                messageLength: response.content.length
            });
            
            return {
                messages: [new HumanMessage({ content: response.content, name: state.next })]
            };
        }
    } catch (error) {
        logger.error(`Error in specialized node for agent ${state.next}:`, error);
        return {
            messages: [new HumanMessage({ 
                content: `Error executing ${state.next}: ${error instanceof Error ? error.message : 'Unknown error'}`, 
                name: state.next 
            })]
        };
    }
};

