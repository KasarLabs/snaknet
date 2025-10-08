import { getXStrkContract } from '../../lib/utils/contracts.js';
import { GetTotalStakedStrkSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';
import { formatUnits } from '../../lib/utils/formatting.js';

export const getTotalStakedStrk = async (
  env: envRead,
  _params: GetTotalStakedStrkSchema
) => {
  try {
    const xStrkContract = getXStrkContract(env.provider);

    // Get total assets managed by the vault (TVL)
    // starknet.js returns u256 directly as bigint
    const totalAssets = await xStrkContract.total_assets();

    return {
      status: 'success',
      data: {
        total_strk_staked: totalAssets.toString(),
        total_strk_staked_formatted: formatUnits(totalAssets, 18),
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
