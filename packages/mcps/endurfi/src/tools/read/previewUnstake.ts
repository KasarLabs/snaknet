import { getXStrkContract } from '../../lib/utils/contracts.js';
import { PreviewUnstakeSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';

export const previewUnstake = async (
  env: envRead,
  params: PreviewUnstakeSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Convert amount string to u256 format
    const shares = {
      low: BigInt(params.xstrk_amount) & ((1n << 128n) - 1n),
      high: BigInt(params.xstrk_amount) >> 128n,
    };

    // Preview how much STRK will be received
    const assetsResult = await xStrkContract.preview_redeem(shares);
    const assets = BigInt(assetsResult.low) + (BigInt(assetsResult.high) << 128n);

    return {
      status: 'success',
      data: {
        xstrk_amount: params.xstrk_amount,
        estimated_strk_amount: assets.toString(),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error previewing unstake',
    };
  }
};
