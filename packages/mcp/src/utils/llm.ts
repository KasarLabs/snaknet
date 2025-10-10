import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';

import { MCPEnvironment } from '../graph/mcps/interfaces.js';
import { DEFAULT_MODELS } from '../index.js';
import { logger } from './logger.js';

/**
 * Creates an LLM instance based on available API keys in the environment.
 * Priority: ANTHROPIC_API_KEY > GEMINI_API_KEY > OPENAI_API_KEY
 */
export function createLLM(env: MCPEnvironment | undefined, logModel = false): BaseChatModel {
  const modelName = env?.MODEL_NAME;
  const temperature = 0;

  // Try Anthropic first
  if (env?.ANTHROPIC_API_KEY) {
    const model = modelName || DEFAULT_MODELS.ANTHROPIC_API_KEY;
    if (logModel) {
      logger.error(`Using Anthropic with model: ${model}`, {});
    }
    return new ChatAnthropic({
      model,
      temperature,
      apiKey: env.ANTHROPIC_API_KEY,
    });
  }

  // Try Gemini second
  if (env?.GEMINI_API_KEY) {
    const model = modelName || DEFAULT_MODELS.GEMINI_API_KEY;
    if (logModel) {
      logger.error(`Using Gemini with model: ${model}`, {});
    }
    return new ChatGoogleGenerativeAI({
      model,
      temperature,
      apiKey: env.GEMINI_API_KEY,
    });
  }

  // Try OpenAI third
  if (env?.OPENAI_API_KEY) {
    const model = modelName || DEFAULT_MODELS.OPENAI_API_KEY;
    if (logModel) {
      logger.error(`Using OpenAI with model: ${model}`, {});
    }
    return new ChatOpenAI({
      model,
      temperature,
      apiKey: env.OPENAI_API_KEY,
    });
  }

  throw new Error(
    'No LLM API key found. Please set one of: ANTHROPIC_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY'
  );
}
