import { getWithdrawQueueNFTContract } from '../../lib/utils/contracts.js';
import { ClaimUnstakeRequestSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';

export const claimUnstakeRequest = async (
  env: envWrite,
  params: ClaimUnstakeRequestSchema
) => {
  try {
    const account = env.account;
    const withdrawQueueContract = getWithdrawQueueNFTContract(env.provider);

    // Convert request_id string to u128
    const requestId = BigInt(params.withdraw_request_id);

    withdrawQueueContract.connect(account);
    const claimCalldata = withdrawQueueContract.populate('claim_withdrawal', [
      requestId,
    ]);

    const { transaction_hash } = await account.execute([claimCalldata]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return {
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        withdraw_request_id: params.withdraw_request_id,
        message: 'STRK successfully claimed from withdraw request',
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error claiming unstake request',
    };
  }
};
