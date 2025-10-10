import { SnakAgentInterface } from '../lib/dependances/types.js';
import { RepayTroveParams } from '../schemas/index.js';
import { createTroveManager } from '../lib/utils/troveManager.js';

export const repayTrove = async (
  agent: SnakAgentInterface,
  params: RepayTroveParams
) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const troveManager = createTroveManager(agent, accountAddress);
    const result = await troveManager.repayTransaction(params, agent);
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
