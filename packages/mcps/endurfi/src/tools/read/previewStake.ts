import { getXStrkContract } from '../../lib/utils/contracts.js';
import { PreviewStakeSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';

export const previewStake = async (env: envRead, params: PreviewStakeSchema) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Convert amount string to u256 format
    const assets = {
      low: BigInt(params.strk_amount) & ((1n << 128n) - 1n),
      high: BigInt(params.strk_amount) >> 128n,
    };

    // Preview how much xSTRK will be received
    const sharesResult = await xStrkContract.preview_deposit(assets);
    const shares = BigInt(sharesResult.low) + (BigInt(sharesResult.high) << 128n);

    return {
      status: 'success',
      data: {
        strk_amount: params.strk_amount,
        estimated_xstrk_shares: shares.toString(),
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error previewing stake',
    };
  }
};
