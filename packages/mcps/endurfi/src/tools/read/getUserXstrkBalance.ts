import { getXStrkContract } from '../../lib/utils/contracts.js';
import { GetUserXstrkBalanceSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { envWrite } from '../../interfaces/index.js';

export const getUserXstrkBalance = async (
  env: envRead | envWrite,
  params: GetUserXstrkBalanceSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Use provided address or default to connected account
    let userAddress: string;
    if (params.user_address) {
      userAddress = params.user_address;
    } else if ('account' in env) {
      userAddress = env.account.address;
    } else {
      throw new Error('No user address provided and no account connected');
    }

    // Get xSTRK balance
    const balanceResult = await xStrkContract.balance_of(userAddress);
    const xStrkBalance = BigInt(balanceResult.low) + (BigInt(balanceResult.high) << 128n);

    // Convert xSTRK to STRK equivalent value
    const xStrkAmount = {
      low: xStrkBalance & ((1n << 128n) - 1n),
      high: xStrkBalance >> 128n,
    };
    const strkValueResult = await xStrkContract.convert_to_assets(xStrkAmount);
    const strkValue = BigInt(strkValueResult.low) + (BigInt(strkValueResult.high) << 128n);

    return {
      status: 'success',
      data: {
        user_address: userAddress,
        xstrk_balance: xStrkBalance.toString(),
        strk_value_equivalent: strkValue.toString(),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error getting user xSTRK balance',
    };
  }
};
