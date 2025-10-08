import { getXStrkContract } from '../../lib/utils/contracts.js';
import { GetUserXstrkBalanceSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { envWrite } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

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

    // Get xSTRK balance - starknet.js returns u256 directly as bigint
    const xStrkBalance = await xStrkContract.balance_of(userAddress);

    // Convert xSTRK to STRK equivalent value
    const strkValue = await xStrkContract.convert_to_assets(xStrkBalance);

    return {
      status: 'success',
      data: {
        user_address: userAddress,
        xstrk_balance: xStrkBalance.toString(),
        xstrk_balance_formatted: formatUnits(xStrkBalance, 18),
        strk_value_equivalent: strkValue.toString(),
        strk_value_equivalent_formatted: formatUnits(strkValue, 18),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error getting user xSTRK balance',
    };
  }
};
