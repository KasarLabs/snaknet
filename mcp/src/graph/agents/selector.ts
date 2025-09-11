import { END } from "@langchain/langgraph";
import { ChatAnthropic } from "@langchain/anthropic";
import { z } from 'zod'

import { GraphAnnotation } from "../graph.js";
import { AvailableAgents, getMCPDescription } from "../mcps/utilities.js";
import { logger } from '../../utils/index.js'


const selectorOutputSchema = z.object({
  selectedAgent: z.enum([END, ...AvailableAgents] as [string, ...string[]]),
  reasoning: z.string().describe("Pourquoi cet agent a été choisi")
});

export const selectorAgent = async (state: typeof GraphAnnotation.State) => {
  const lastMessage = state.messages[state.messages.length - 1];
  const userInput = lastMessage.content;
  
  const agentDescriptions = AvailableAgents.map(agent => 
    `- ${agent}: ${getMCPDescription(agent)}`
  ).join('\n');

  const systemPrompt = `You are a supervisor that routes requests to specialized agents.

Available agents:
${agentDescriptions}

Instructions:
- Analyze the user's request
- Choose the most appropriate agent based on their domain
- If no agent can handle the request, choose "FINISH"

Respond with the exact name of the chosen agent.`;

  try {
    const model = new ChatAnthropic({
      model: "claude-3-5-sonnet-latest",
    });
    
    const response = await model.withStructuredOutput({
      schema: selectorOutputSchema
    }).invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: `User's request : "${userInput}"` }
    ]);

    logger.info(`Routing decision`, { 
      selectedAgent: response.selectedAgent, 
      reasoning: response.reasoning 
    });

    return {
      next: response.selectedAgent,
      routingInfo: {
        reasoning: response.reasoning,
        timestamp: new Date().toISOString(),
      }
    };

  } catch (error) {
    console.error("Selector error:", error);
    return {
      next: END,
      routingInfo: {
        reasoning: "Technical selector error",
        timestamp: new Date().toISOString(),
      }
    };
  }
};