import { SnakAgentInterface } from '../lib/dependances/types.js';
import { GetTroveHealthParams, GetUserTrovesParams } from '../schemas/index.js';
import { createTroveManager } from '../lib/utils/troveManager.js';

export const getUserTroves = async (
  agent: SnakAgentInterface,
  params: GetUserTrovesParams
) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const TroveManager = createTroveManager(agent, accountAddress);
    const result = await TroveManager.getUserTroves(params);
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

export const getTroveHealth = async (
  agent: SnakAgentInterface,
  params: GetTroveHealthParams
) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const troveManager = createTroveManager(agent, accountAddress);
    const result = await troveManager.getTroveHealth(params);
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

export const getBorrowFee = async (agent: SnakAgentInterface) => {
  const accountAddress = agent.getAccountCredentials()?.accountPublicKey;

  try {
    const TroveManager = createTroveManager(agent, accountAddress);
    const result = await TroveManager.getBorrowFee();
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
