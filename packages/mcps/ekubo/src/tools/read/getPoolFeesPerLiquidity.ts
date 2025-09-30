import { PoolKey } from '../../schemas/index.js';
import { RpcProvider } from 'starknet';
import { Contract } from "starknet";
import { CORE_ABI } from "../../lib/contracts/abi.js";
import { getContractAddress, convertFeePercentToU128 } from "../../lib/utils/index.js";

export const getPoolFeesPerLiquidity = async (
  provider: RpcProvider,
  params: PoolKey
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

    // Convert fee percentage to u128
    const poolKey = {
      ...params,
      fee: convertFeePercentToU128(params.fee)
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