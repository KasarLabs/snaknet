import { getXStrkContract } from '../../lib/utils/contracts.js';
import { PreviewUnstakeSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

export const previewUnstake = async (
  env: envRead,
  params: PreviewUnstakeSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Preview how much STRK will be received for the given xSTRK amount
    // starknet.js returns u256 directly as bigint
    const assets = await xStrkContract.preview_redeem(BigInt(params.xstrk_amount));

    return {
      status: 'success',
      data: {
        xstrk_amount: params.xstrk_amount,
        xstrk_amount_formatted: formatUnits(BigInt(params.xstrk_amount), 18),
        estimated_strk_amount: assets.toString(),
        estimated_strk_amount_formatted: formatUnits(assets, 18),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error previewing unstake',
    };
  }
};
