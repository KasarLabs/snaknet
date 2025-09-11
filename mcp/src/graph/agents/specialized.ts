import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";

import { getMCPClientConfig } from "../mcps/utilities.js";
import { GraphAnnotation } from "../graph.js";
import { logger } from '../../utils/index.js'

async function specializedAgent(mcpServerName: string) {
    try {
        const client = new MultiServerMCPClient({
            mcpServers: {
                [mcpServerName]: getMCPClientConfig(mcpServerName)
            }
        });
        
        const tools = await client.getTools();
        logger.error(
            `Loaded ${tools.length} MCP tools: ${tools
                .map((tool) => tool.name)
                .join(", ")}`
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
    logger.error(`Specialized node executing for agent: ${state.next}`);

    try {
        const { model, toolNode } = await specializedAgent(state.next);
        
        // Call the model with the current messages
        const response = await model.invoke(state.messages);
        
        // Check if there are tool calls
        if (response.tool_calls && response.tool_calls.length > 0) {
            logger.error(`Tool calls detected: ${response.tool_calls.map(tc => tc.name).join(', ')}`);
            
            // Execute tools
            const toolResults = await toolNode.invoke({ messages: [...state.messages, response] });
            
            // Call model again with tool results
            const finalResponse = await model.invoke([
                ...state.messages, 
                response, 
                ...toolResults.messages
            ]);
            
            logger.error('Agent response with tools completed', {
                agent: state.next,
                toolCalls: response.tool_calls.length,
                messageLength: finalResponse.content.length
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

