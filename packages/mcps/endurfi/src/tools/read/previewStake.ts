import { getXStrkContract } from '../../lib/utils/contracts.js';
import { PreviewStakeSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

export const previewStake = async (env: envRead, params: PreviewStakeSchema) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Preview how much xSTRK will be received for the given STRK amount
    // starknet.js returns u256 directly as bigint
    const shares = await xStrkContract.preview_deposit(BigInt(params.strk_amount));

    return {
      status: 'success',
      data: {
        strk_amount: params.strk_amount,
        strk_amount_formatted: formatUnits(BigInt(params.strk_amount), 18),
        estimated_xstrk_shares: shares.toString(),
        estimated_xstrk_shares_formatted: formatUnits(shares, 18),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error previewing stake',
    };
  }
};
