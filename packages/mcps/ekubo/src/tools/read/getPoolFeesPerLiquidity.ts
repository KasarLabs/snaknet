import { PoolKey } from '../../schemas/index.js';
import { RpcProvider } from 'starknet';
import { Contract } from "starknet";
import { CORE_ABI } from "../../lib/contracts/abi.js";
import { getContractAddress, convertFeePercentToU128, convertTickSpacingPercentToExponent } from "../../lib/utils/index.js";
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';

export const getPoolFeesPerLiquidity = async (
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
    
    // Convert fee percentage to u128 and tick_spacing to exponent
    const poolKey = {
      ...params,
      token0: token0.address < token1.address ? token0.address : token1.address,
      token1: token0.address < token1.address ? token1.address : token0.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing)
    };

    const feesResult = await contract.get_pool_fees_per_liquidity(poolKey);

    return JSON.stringify({
      status: 'success',
      data: {
        fee_growth_global_0: feesResult.value0.toString(),
        fee_growth_global_1: feesResult.value1.toString()
      }
    });
  } catch (error: any) {
    console.error('Error getting pool fees per liquidity:', error);
    return JSON.stringify({
      status: 'failure',
      error: error.message,
    });
  }
};