import { getXStrkContract, getStrkContract } from '../../lib/utils/contracts.js';
import { StakeStrkSchema } from '../../schemas/index.js';
import { envWrite } from '../../interfaces/index.js';

export const stakeStrk = async (env: envWrite, params: StakeStrkSchema) => {
  try {
    const account = env.account;
    const xStrkContract = getXStrkContract(env.provider);
    const strkContract = getStrkContract(env.provider);

    // Convert amount string to u256 format
    const amount = {
      low: BigInt(params.amount) & ((1n << 128n) - 1n),
      high: BigInt(params.amount) >> 128n,
    };

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

    // Get the xSTRK balance after staking to return shares received
    const xStrkBalance = await xStrkContract.balance_of(account.address);
    const xStrkReceived = xStrkBalance.toString();

    return {
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        strk_staked: params.amount,
        xstrk_received: xStrkReceived,
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error during STRK staking',
    };
  }
};
