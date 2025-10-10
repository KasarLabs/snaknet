import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

import { MCPEnvironment } from '../graph/mcps/interfaces.js';

/**
 * Creates an LLM instance based on available API keys in the environment.
 * Priority: ANTHROPIC_API_KEY > GEMINI_API_KEY > OPENAI_API_KEY
 */
export function createLLM(env: MCPEnvironment): BaseChatModel {
  const modelName = env.MODEL_NAME as string;
  const temperature = 0;

  if (env.ANTHROPIC_API_KEY) {
    return new ChatAnthropic({
      model: modelName,
      temperature,
      apiKey: env.ANTHROPIC_API_KEY,
    });
  }

  if (env.GEMINI_API_KEY) {
    return new ChatGoogleGenerativeAI({
      model: modelName,
      temperature,
      apiKey: env.GEMINI_API_KEY,
    });
  }

  if (env.OPENAI_API_KEY) {
    return new ChatOpenAI({
      model: modelName,
      temperature,
      apiKey: env.OPENAI_API_KEY,
    });
  }

  throw new Error(
    'No LLM API key found. Please set one of: ANTHROPIC_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY'
  );
}
