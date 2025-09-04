import { Account, Contract, constants } from 'starknet';
import { SnakAgentInterface } from '../dependances/types.js';
import { INTERACT_ERC721_ABI } from '../abis/interact.js';
import { executeV3Transaction } from '../utils/utils.js';
import { z } from 'zod';
import { setApprovalForAllSchema } from '../schemas/schema.js';
import { TransactionResult } from '../types/types.js';
import { validateAndParseAddress } from 'starknet';

/**
 * Set the approval for all tokens of the contract.
 * @param {SnakAgentInterface} agent - The Starknet agent interface
 * @param {z.infer<typeof setApprovalForAllSchema>} params - Approval parameters
 * @returns {Promise<string>} JSON string with transaction result
 */
export const setApprovalForAll = async (
  agent: SnakAgentInterface,
  params: z.infer<typeof setApprovalForAllSchema>
): Promise<string> => {
  try {
    if (
      !params?.operatorAddress ||
      params?.approved === undefined ||
      !params?.contractAddress
    ) {
      throw new Error(
        'Operator address, approved status and contract address are required'
      );
    }
    const provider = agent.getProvider();
    const accountCredentials = agent.getAccountCredentials();

    const operatorAddress = validateAndParseAddress(params.operatorAddress);
    const contractAddress = validateAndParseAddress(params.contractAddress);

    const account = new Account(
      provider,
      accountCredentials.accountPublicKey,
      accountCredentials.accountPrivateKey,
      undefined,
      constants.TRANSACTION_VERSION.V3
    );

    const contract = new Contract(
      INTERACT_ERC721_ABI,
      contractAddress,
      provider
    );
    contract.connect(account);

    const calldata = contract.populate('set_approval_for_all', [
      operatorAddress,
      params.approved ? true : false,
    ]);

    const txH = await executeV3Transaction({
      call: calldata,
      account: account,
    });

    const result: TransactionResult = {
      status: 'success',
      operator: operatorAddress,
      approved: params.approved,
      transactionHash: txH,
    };

    return JSON.stringify(result);
  } catch (error) {
    const result: TransactionResult = {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'setApprovalForAll execution',
    };
    return JSON.stringify(result);
  }
};
