import { SnakAgentInterface } from '../lib/dependances/types.js';
import { WithdrawTroveParams } from '../schemas/index.js';
import { createTroveManager } from '../lib/utils/troveManager.js';

export const withdrawTrove = async (
  agent: SnakAgentInterface,
  params: WithdrawTroveParams
)=> {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const troveManager = createTroveManager(agent, accountAddress);
    const result = await troveManager.withdrawTransaction(params, agent);
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
