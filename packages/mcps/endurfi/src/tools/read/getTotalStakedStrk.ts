import { getXStrkContract } from '../../lib/utils/contracts.js';
import { GetTotalStakedStrkSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';

export const getTotalStakedStrk = async (
  env: envRead,
  _params: GetTotalStakedStrkSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Get total assets managed by the vault (TVL)
    const totalAssetsResult = await xStrkContract.total_assets();
    const totalAssets =
      BigInt(totalAssetsResult.low) + (BigInt(totalAssetsResult.high) << 128n);

    return {
      status: 'success',
      data: {
        total_strk_staked: totalAssets.toString(),
        description: 'Total STRK staked on Endur.fi (TVL)',
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error getting total staked STRK',
    };
  }
};
