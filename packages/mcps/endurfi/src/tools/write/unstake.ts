import {
  getXStrkContract,
  getWithdrawQueueNFTAddress,
} from '../../lib/utils/contracts.js';
import { UnstakeXstrkQueueSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';
import { extractWithdrawRequestIdFromReceipt } from '../../lib/utils/events.js';

export const unstakeXstrkQueue = async (
  env: envWrite,
  params: UnstakeXstrkQueueSchema
) => {
  try {
    const account = env.account;
    const xStrkContract = getXStrkContract(env.provider);

    // Convert amount string to bigint - starknet.js handles u256 conversion
    const shares = BigInt(params.xstrk_amount);

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

    const withdrawQueueNftAddress = getWithdrawQueueNFTAddress(env.provider);
    const withdrawRequestId = extractWithdrawRequestIdFromReceipt(
      receipt,
      withdrawQueueNftAddress
    );

    return {
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        xstrk_amount: params.xstrk_amount,
        xstrk_amount_formatted: formatUnits(shares, 18),
        withdraw_request_id: withdrawRequestId || 'Not found in events',
        message:
          'Unstake request created. Wait 1-2 days before claiming with claim_unstake_request.',
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error during xSTRK unstaking',
    };
  }
};
