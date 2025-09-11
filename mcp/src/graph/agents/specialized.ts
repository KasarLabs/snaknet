import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

import { getMCPClientConfig, getMCPPromptInfo } from "../mcps/utilities.js";
import { specializedPrompt } from "./prompts.js";
import { GraphAnnotation } from "../graph.js";
import { logger } from '../../utils/index.js'

async function specializedAgent(mcpServerName: string) {
    try {
        const model = new ChatAnthropic({
            model: "claude-3-5-sonnet-latest",
            });
        const client = new MultiServerMCPClient({
            mcpServers: {
                [mcpServerName]: getMCPClientConfig(mcpServerName)
            }
        });
        const tools = await client.getTools();
        const agent = createReactAgent({
            llm: model,
            tools,
            stateModifier: new SystemMessage(specializedPrompt(getMCPPromptInfo(mcpServerName)))
        });
        return agent;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const specializedNode = async (state: typeof GraphAnnotation.State) => {
    logger.info(`Specialized node executing for agent: ${state.next}`);

    const agent =  await specializedAgent(state.next);
    const result = await agent.invoke(state);
    const lastMessage = result.messages[result.messages.length - 1];

    logger.debug('Agent response received', {
      agent: state.next,
      messageLength: lastMessage.content.length
    });

    return {
        messages: [
            new HumanMessage({ content: lastMessage.content, name: state.next }),
        ],
    }
};

