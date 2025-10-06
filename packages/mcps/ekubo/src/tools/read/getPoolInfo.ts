import { PoolKey, envRead } from '../../schemas/index.js';
import { calculateTickFromSqrtPrice, calculateActualPrice, convertFeePercentToU128, convertTickSpacingPercentToExponent } from "../../lib/utils/math.js";
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { getContract } from '../../lib/contracts/index.js';

export const getPoolInfo = async (
  env: envRead,
  params: PoolKey
) => {
  const provider = env.provider;
  try {
    const contract = await getContract(provider, 'core');

    const { assetSymbol: symbolToken0, assetAddress: addressToken0 } = extractAssetInfo(params.token0);
    const { assetSymbol: symbolToken1, assetAddress: addressToken1 } = extractAssetInfo(params.token1);

    const token0: validToken = await validateToken(
      provider,
      symbolToken0,
      addressToken0
    );

    const token1: validToken = await validateToken(
      provider,
      symbolToken1,
      addressToken1
    );
    
    // Convert fee percentage to u128 and tick_spacing to exponent
    const poolKey = {
      ...params,
      token0: token0.address < token1.address ? token0.address : token1.address,
      token1: token0.address < token1.address ? token1.address : token0.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing)
    };

    const priceResult = await contract.get_pool_price(poolKey);
    const liquidityResult = await contract.get_pool_liquidity(poolKey);
    const feesResult = await contract.get_pool_fees_per_liquidity(poolKey);

    const sqrtPrice = priceResult.sqrt_ratio;
    const currentTick = calculateTickFromSqrtPrice(sqrtPrice);

    // Determine which token was sorted as token0/token1 in poolKey
    const sortedToken0 = token0.address < token1.address ? token0 : token1;
    const sortedToken1 = token0.address < token1.address ? token1 : token0;

    // Calculate human-readable price (token1/token0)
    const readablePrice = calculateActualPrice(sqrtPrice, sortedToken0.decimals, sortedToken1.decimals);

    return {
      status: 'success',
      data: {
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
        sqrt_price: sqrtPrice.toString(),
        price: readablePrice,
        liquidity: liquidityResult.toString(),
        fees_per_liquidity: {
          fee_growth_global_0: feesResult.value0.toString(),
          fee_growth_global_1: feesResult.value1.toString()
        },
        current_tick: currentTick
      }
    };
  } catch (error) {
    console.error('Error getting pool information:', error);
    return {
      status: 'failed',
      error: error.message,
    };
  }
};
