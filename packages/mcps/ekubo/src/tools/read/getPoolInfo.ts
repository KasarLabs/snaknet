import { PoolKey } from '../../schemas/index.js';
import { RpcProvider } from 'starknet';
import { Contract } from "starknet";
import { CORE_ABI } from "../../lib/contracts/abi.js";
import { calculateTickFromSqrtPrice, getContractAddress, convertFeePercentToU128 } from "../../lib/utils/index.js";
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';

export const getPoolInfo = async (
  provider: RpcProvider,
  params: PoolKey
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

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
    
    // Convert fee percentage to u128
    const poolKey = {
      ...params,
      token0: token0.address < token1.address ? token0.address : token1.address,
      token1: token0.address < token1.address ? token1.address : token0.address,
      fee: convertFeePercentToU128(params.fee)
    };

    const priceResult = await contract.get_pool_price(poolKey);
    const liquidityResult = await contract.get_pool_liquidity(poolKey);
    const feesResult = await contract.get_pool_fees_per_liquidity(poolKey);

    const sqrtPrice = priceResult.sqrt_ratio;
    const currentTick = calculateTickFromSqrtPrice(sqrtPrice);

    return {
      status: 'success',
      data: {
        price: sqrtPrice.toString(),
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
