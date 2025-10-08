import { getXStrkContract, getStrkContract } from '../../lib/utils/contracts.js';
import { StakeStrkSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

export const stakeStrk = async (env: envWrite, params: StakeStrkSchema) => {
  try {
    const account = env.account;
    const xStrkContract = getXStrkContract(env.provider);
    const strkContract = getStrkContract(env.provider);

    // Convert amount string to bigint - starknet.js handles u256 conversion
    const amount = BigInt(params.amount);

    // Preview how much xSTRK will be received before staking
    const expectedXstrkShares = await xStrkContract.preview_deposit(amount);

    // Step 1: Approve xSTRK contract to spend STRK
    strkContract.connect(account);
    const approveCalldata = strkContract.populate('approve', [
      xStrkContract.address,
      amount,
    ]);

    // Step 2: Deposit STRK to receive xSTRK
    xStrkContract.connect(account);
    const depositCalldata = xStrkContract.populate('deposit', [
      amount,
      account.address,
    ]);

    // Execute both transactions
    const { transaction_hash } = await account.execute([
      approveCalldata,
      depositCalldata,
    ]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return {
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        strk_staked: params.amount,
        strk_staked_formatted: formatUnits(amount, 18),
        xstrk_received: expectedXstrkShares.toString(),
        xstrk_received_formatted: formatUnits(expectedXstrkShares, 18),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error during STRK staking',
    };
  }
};
