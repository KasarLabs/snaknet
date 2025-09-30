import { PoolKey } from '../schemas/index.js';
import { RpcProvider } from 'starknet';
import { Contract } from "starknet";
import { CORE_ABI } from "../lib/contracts/abi.js";
import { calculateTickFromSqrtPrice, getContractAddress } from "../lib/utils/index.js";

export const getPoolInfo = async (
  provider: RpcProvider,
  params: PoolKey
) => {
  try {
    const contractAddress = await getContractAddress(provider);
    const contract = new Contract(CORE_ABI, contractAddress, provider);

    const priceResult = await contract.get_pool_price(params);
    const liquidityResult = await contract.get_pool_liquidity(params);
    const feesResult = await contract.get_pool_fees_per_liquidity(params);

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
