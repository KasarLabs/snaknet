import { END } from '@langchain/langgraph';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
import {
  BaseChatModel,
  BaseChatModelCallOptions,
} from '@langchain/core/language_models/chat_models';

import { GraphAnnotation } from '../graph.js';
import { AvailableAgents, getMCPDescription } from '../mcps/utilities.js';
import { logger } from '../../utils/index.js';
import { AIMessageChunk } from '@langchain/core/messages';
import { MCPEnvironment } from '../mcps/interfaces.js';
import { DEFAULT_MODELS } from '../../index.js';

const selectorOutputSchema = z.object({
  selectedAgent: z.enum([END, ...AvailableAgents] as [string, ...string[]]),
  reasoning: z.string().describe('Why this agent was chosen'),
});

/**
 * Creates an LLM instance for the selector agent based on available API keys.
 * Priority: ANTHROPIC_API_KEY > GEMINI_API_KEY > OPENAI_API_KEY
 */
function createSelectorLLM(
  env: MCPEnvironment | undefined
): BaseChatModel<BaseChatModelCallOptions, AIMessageChunk> {
  const modelName = env?.MODEL_NAME;
  const temperature = 0;

  // Try Anthropic first
  if (env?.ANTHROPIC_API_KEY) {
    return new ChatAnthropic({
      model: modelName || DEFAULT_MODELS.ANTHROPIC_API_KEY,
      temperature,
      apiKey: env.ANTHROPIC_API_KEY,
    }) as BaseChatModel<BaseChatModelCallOptions, AIMessageChunk>;
  }

  // Try Gemini second
  if (env?.GEMINI_API_KEY) {
    return new ChatGoogleGenerativeAI({
      model: modelName || DEFAULT_MODELS.GEMINI_API_KEY,
      temperature,
      apiKey: env.GEMINI_API_KEY,
    }) as BaseChatModel<BaseChatModelCallOptions, AIMessageChunk>;
  }

  // Try OpenAI third
  if (env?.OPENAI_API_KEY) {
    return new ChatOpenAI({
      model: modelName || DEFAULT_MODELS.OPENAI_API_KEY,
      temperature,
      apiKey: env.OPENAI_API_KEY,
    }) as BaseChatModel<BaseChatModelCallOptions, AIMessageChunk>;
  }

  throw new Error(
    'No LLM API key found. Please set one of: ANTHROPIC_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY'
  );
}

export const selectorAgent = async (state: typeof GraphAnnotation.State) => {
  const lastMessage = state.messages[state.messages.length - 1];
  const userInput = lastMessage.content;

  const agentDescriptions = AvailableAgents.map(
    (agent) => `- ${agent}: ${getMCPDescription(agent)}`
  ).join('\n');

  const systemPrompt = `You are a supervisor that routes requests to specialized agents.

Available agents:
${agentDescriptions}

Instructions:
- Analyze the user's request
- If the user's original request has been COMPLETED by a previous agent response, choose "__end__"
- If a previous agent has already provided a complete answer or completed the requested action, choose "__end__"
- Only choose a specialized agent if the request is NEW or INCOMPLETE
- If no agent can handle the request, choose "__end__"


IMPORTANT: Look at the conversation history. If an agent has already successfully completed the user's request (like creating an account, providing information, etc.), you MUST choose "__end__" to stop the conversation.

Respond with the exact name of the chosen agent or "__end__".`;

  try {
    const model = createSelectorLLM(state.mcpEnvironment);
    const structuredModel = model.withStructuredOutput(selectorOutputSchema);
    const response = await structuredModel.invoke([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `User's request : "${userInput}"` },
    ]);

    logger.error(`Routing decision`, {
      selectedAgent: response.selectedAgent,
      reasoning: response.reasoning,
    });

    return {
      next: response.selectedAgent,
      routingInfo: {
        reasoning: response.reasoning,
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Selector error:', error);
    return {
      next: END,
      routingInfo: {
        reasoning: 'Technical selector error',
        timestamp: new Date().toISOString(),
      },
    };
  }
};
