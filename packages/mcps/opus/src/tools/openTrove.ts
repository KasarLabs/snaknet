import { SnakAgentInterface } from '../lib/dependances/types.js';
import { OpenTroveParams } from '../schemas/index.js';
import { createTroveManager } from '../lib/utils/troveManager.js';

export const openTrove = async (
  agent: SnakAgentInterface,
  params: OpenTroveParams
) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const troveManager = createTroveManager(agent, accountAddress);
    const result = await troveManager.openTroveTransaction(params, agent);
    return {
      status: 'success',
      data: result,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
