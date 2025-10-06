import { PoolKey, envRead } from '../../schemas/index.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent } from "../../lib/utils/math.js";
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { getContract } from '../../lib/contracts/index.js';
import { preparePoolKeyFromParams } from '../../lib/utils/pools.js';

export const getPoolLiquidity = async (
  env: envRead,
  params: PoolKey
) => {
  const provider = env.provider;
  try {
    const contract = await getContract(provider, 'core');

    const { poolKey } = await preparePoolKeyFromParams(
      env.provider,
      {
        token0: params.token0,
        token1: params.token1,
        fee: params.fee,
        tick_spacing: params.tick_spacing,
        extension: params.extension
      }
    );

    const liquidityResult = await contract.get_pool_liquidity(poolKey);

    return JSON.stringify({
      status: 'success',
      data: {
        liquidity: liquidityResult.toString()
      }
    });
  } catch (error: any) {
    console.error('Error getting pool liquidity:', error);
    return JSON.stringify({
      status: 'failure',
      error: error.message,
    });
  }
};