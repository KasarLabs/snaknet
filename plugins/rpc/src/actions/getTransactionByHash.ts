import { TransactionHashParams } from '../schema/index.js';
import { SnakAgentInterface } from './dependances/types';

export const getTransactionByHash = async (
  agent: SnakAgentInterface,
  params: TransactionHashParams
) => {
  const provider = agent.getProvider();

  try {
    const { transactionHash } = params;
    const transaction = await provider.getTransactionByHash(transactionHash);
    return JSON.stringify({
      status: 'success',
      transaction,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
