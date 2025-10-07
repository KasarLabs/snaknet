import { getXStrkContract } from '../../lib/utils/contracts.js';
import { UnstakeXstrkQueueSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';

export const unstakeXstrkQueue = async (
  env: envWrite,
  params: UnstakeXstrkQueueSchema
) => {
  try {
    const account = env.account;
    const xStrkContract = getXStrkContract(env.provider);

    // Convert amount string to u256 format
    const shares = {
      low: BigInt(params.xstrk_amount) & ((1n << 128n) - 1n),
      high: BigInt(params.xstrk_amount) >> 128n,
    };

    // Call redeem to create a withdraw request (NFT)
    xStrkContract.connect(account);
    const redeemCalldata = xStrkContract.populate('redeem', [
      shares,
      account.address,
      account.address,
    ]);

    const { transaction_hash } = await account.execute([redeemCalldata]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    // Note: The withdraw_request_id (NFT ID) would be emitted in events
    // For now, we return success with transaction hash
    return {
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        xstrk_amount: params.xstrk_amount,
        message:
          'Unstake request created. Check transaction events for withdraw request ID (NFT). Wait 1-2 days before claiming.',
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error during xSTRK unstaking',
    };
  }
};
