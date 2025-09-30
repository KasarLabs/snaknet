import { PoolKey } from '../../schemas/index.js';
import { RpcProvider } from 'starknet';
import { Contract } from "starknet";
import { CORE_ABI } from "../../lib/contracts/abi.js";
import { getContractAddress, convertFeePercentToU128 } from "../../lib/utils/index.js";

export const getPoolLiquidity = async (
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