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

    // Note: The actual method name for claiming may vary
    // This is a placeholder - need to check Endur.fi contract ABI for exact method
    withdrawQueueContract.connect(account);

    // For now, return a message indicating this needs proper ABI
    return JSON.stringify({
      status: 'failure',
      error:
        'Claim functionality requires proper withdraw queue NFT ABI. Please check Endur.fi documentation for the exact claim method.',
    });

    // TODO: Implement once we have the proper ABI
    // const claimCalldata = withdrawQueueContract.populate('claim', [params.withdraw_request_id]);
    // const { transaction_hash } = await account.execute([claimCalldata]);
    // const receipt = await account.waitForTransaction(transaction_hash);
    // if (!receipt.isSuccess()) {
    //   throw new Error('Transaction confirmed but failed');
    // }
    // return JSON.stringify({
    //   status: 'success',
    //   data: {
    //     transaction_hash: transaction_hash,
    //     withdraw_request_id: params.withdraw_request_id,
    //   },
    // });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error claiming unstake request',
    });
  }
};
