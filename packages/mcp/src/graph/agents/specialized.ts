import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage } from '@langchain/core/messages';
import { ToolNode } from '@langchain/langgraph/prebuilt';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

import { getMCPClientConfig } from '../mcps/utilities.js';
import { GraphAnnotation } from '../graph.js';
import { logger } from '../../utils/index.js';
import { MCPEnvironment } from '../mcps/interfaces.js';
import { DEFAULT_MODELS } from '../../index.js';

/**
 * Creates an LLM instance based on available API keys in the environment.
 * Priority: ANTHROPIC_API_KEY > GEMINI_API_KEY > OPENAI_API_KEY
 */
function createLLMModel(env: MCPEnvironment | undefined): BaseChatModel {
  const modelName = env?.MODEL_NAME;
  const temperature = 0;

  // Try Anthropic first
  if (env?.ANTHROPIC_API_KEY) {
    logger.error(`Using Anthropic with model: ${modelName || DEFAULT_MODELS.ANTHROPIC_API_KEY}`, {});
    return new ChatAnthropic({
      model: modelName || DEFAULT_MODELS.ANTHROPIC_API_KEY,
      temperature,
      apiKey: env.ANTHROPIC_API_KEY,
    });
  }

  // Try Gemini second
  if (env?.GEMINI_API_KEY) {
    logger.error(`Using Gemini with model: ${modelName || DEFAULT_MODELS.GEMINI_API_KEY}`, {});
    return new ChatGoogleGenerativeAI({
      model: modelName || DEFAULT_MODELS.GEMINI_API_KEY,
      temperature,
      apiKey: env.GEMINI_API_KEY,
    });
  }

  // Try OpenAI third
  if (env?.OPENAI_API_KEY) {
    logger.error(`Using OpenAI with model: ${modelName || DEFAULT_MODELS.OPENAI_API_KEY}`, {});
    return new ChatOpenAI({
      model: modelName || DEFAULT_MODELS.OPENAI_API_KEY,
      temperature,
      apiKey: env.OPENAI_API_KEY,
    });
  }

  throw new Error(
    'No LLM API key found. Please set one of: ANTHROPIC_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY'
  );
}

async function specializedAgent(
  mcpServerName: string,
  env: MCPEnvironment | undefined
) {
  try {
    const client = new MultiServerMCPClient({
      mcpServers: {
        [mcpServerName]: getMCPClientConfig(mcpServerName, env),
      },
    });

    const tools = await client.getTools();
    logger.error(
      `Loaded ${tools.length} MCP tools: ${tools
        .map((tool) => tool.name)
        .join(', ')}`,
      {}
    );

    const llm = createLLMModel(env);

    if (!llm.bindTools) {
      throw new Error('The selected LLM model does not support tool binding');
    }

    const model = llm.bindTools(tools);
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
    const { model, toolNode } = await specializedAgent(
      state.next,
      state.mcpEnvironment
    );

    const response = await model.invoke(state.messages);

    if (response.tool_calls && response.tool_calls.length > 0) {
      logger.error(
        `Tool calls detected: ${response.tool_calls.map((tc) => tc.name).join(', ')}`,
        {}
      );
      const toolResults = await toolNode.invoke({
        messages: [...state.messages, response],
      });
      const finalResponse = await model.invoke([
        ...state.messages,
        response,
        ...toolResults.messages,
      ]);

      logger.error('Agent response with tools completed', {
        agent: state.next,
        toolCalls: response.tool_calls,
        toolResults: toolResults,
        toolArgs: response.tool_calls[0].args,
        toolArgsType: typeof response.tool_calls[0].args,
      });

      return {
        messages: [
          new HumanMessage({
            content: finalResponse.content,
            name: state.next,
          }),
        ],
      };
    } else {
      logger.error('Agent response without tools', {
        agent: state.next,
        messageLength: response.content.length,
      });

      return {
        messages: [
          new HumanMessage({ content: response.content, name: state.next }),
        ],
      };
    }
  } catch (error) {
    logger.error(`Error in specialized node for agent ${state.next}:`, error);
    return {
      messages: [
        new HumanMessage({
          content: `Error executing ${state.next}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          name: state.next,
        }),
      ],
    };
  }
};
