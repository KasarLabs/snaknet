import { Account, Contract, RpcProvider, constants } from 'starknet';
import { SnakAgentInterface } from '../dependances/types.js';
import {
  validateAndFormatParams,
  executeV3Transaction,
  validateToken,
  detectAbiType,
  extractAssetInfo,
} from '../utils/utils.js';
import { z } from 'zod';
import { approveSchema, approveSignatureSchema } from '../schemas/schema.js';
import { validToken } from '../types/types.js';

/**
 * Approves token spending
 * @param {SnakAgentInterface} agent - The Starknet agent interface
 * @param {ApproveParams} params - Approval parameters
 * @returns {Promise<string>} JSON string with transaction result
 * @throws {Error} If approval fails
 */
export const approve = async (
  agent: SnakAgentInterface,
  params: z.infer<typeof approveSchema>
): Promise<string> => {
  try {
    const provider = agent.getProvider();
    const accountCredentials = agent.getAccountCredentials();

    const { assetSymbol, assetAddress } = extractAssetInfo(params.asset);

    const token = await validateToken(
      provider,
      assetSymbol,
      assetAddress
    );
    const abi = await detectAbiType(token.address, provider);
    const { address, amount } = validateAndFormatParams(
      params.spenderAddress,
      params.amount,
      token.decimals
    );

    const spenderAddress = address;

    const account = new Account(
      provider,
      accountCredentials.accountPublicKey,
      accountCredentials.accountPrivateKey,
      undefined,
      constants.TRANSACTION_VERSION.V3
    );

    const contract = new Contract(abi, token.address, provider);
    contract.connect(account);

    const calldata = contract.populate('approve', [spenderAddress, amount]);

    const txH = await executeV3Transaction({
      call: calldata,
      account: account,
    });

    return JSON.stringify({
      status: 'success',
      amount: params.amount,
      symbol: token.symbol,
      spender_address: spenderAddress,
      transactionHash: txH,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'transfer execution',
    });
  }
};
