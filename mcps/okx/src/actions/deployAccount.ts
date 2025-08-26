import { RpcProvider } from 'starknet';
import { SnakAgentInterface } from '../dependances/types.js';
import { OKX_CLASSHASH } from '../constant/contract.js';
import { AccountManager } from '../utils/AccountManager.js';
import { z } from 'zod';
import { accountDetailsSchema } from '../schemas/schema.js';

/**
 * Deploys an OKX account using Starknet agent.
 * @async
 * @function DeployOKXAccount
 * @param {SnakAgentInterface} agent - The Starknet agent
 * @param {z.infer<typeof accountDetailsSchema>} params - Account details
 * @returns {Promise<string>} JSON string with deployment result
 * @throws {Error} If deployment fails
 */
export const DeployOKXAccount = async (
  agent: SnakAgentInterface,
  params: z.infer<typeof accountDetailsSchema>
) => {
  try {
    const provider = agent.getProvider();

    const accountManager = new AccountManager(provider);
    const tx = await accountManager.deployAccount(OKX_CLASSHASH, params);

    return JSON.stringify({
      status: 'success',
      wallet: 'OKX',
      transaction_hash: tx.transactionHash,
      contract_address: tx.contractAddress,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

