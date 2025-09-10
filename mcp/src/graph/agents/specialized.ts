import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatAnthropic } from "@langchain/anthropic";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

import { getMCPClientConfig, getMCPPromptInfo } from "../mcps/utilities.js";
import { specializedPrompt } from "./prompts.js";
import { GraphAnnotation } from "../graph.js";

const model = new ChatAnthropic({
  model: "claude-3-5-sonnet-latest",
});

async function specializedAgent(mcpServerName: string) {
    try {
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
    const agent =  await specializedAgent(state.next);
    const result = await agent.invoke(state);
    const lastMessage = result.messages[result.messages.length - 1];
    return {
        messages: [
            new HumanMessage({ content: lastMessage.content, name: state.next }),
        ],
    }
};

