import { SnakAgentInterface } from '../lib/dependances/types.js';
import { DepositTroveParams } from '../schemas/index.js';
import { createTroveManager } from '../lib/utils/troveManager.js';

export const depositTrove = async (
  agent: SnakAgentInterface,
  params: DepositTroveParams
) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const troveManager = createTroveManager(agent, accountAddress);
    const result = await troveManager.depositTransaction(params, agent);
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
