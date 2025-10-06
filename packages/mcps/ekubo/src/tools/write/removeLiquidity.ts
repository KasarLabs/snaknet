import { RpcProvider, Contract, Account, CallData } from 'starknet';
import { CORE_ABI } from '../../lib/contracts/abi.js';
import { getContractAddress, convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { RemoveLiquiditySchema } from '../../schemas/index.js';

export const removeLiquidity = async (
  env: any,
  params: RemoveLiquiditySchema
) => {
  try {
    const contractAddress = await getContractAddress(env.provider);
    const contract = new Contract(CORE_ABI, contractAddress, env.provider);

    // Validate tokens
    const { assetSymbol: symbol0, assetAddress: address0 } = extractAssetInfo(params.token0);
    const { assetSymbol: symbol1, assetAddress: address1 } = extractAssetInfo(params.token1);

    const token0: validToken = await validateToken(env.provider, symbol0, address0);
    const token1: validToken = await validateToken(env.provider, symbol1, address1);

    // Sort tokens by address (Ekubo requirement)
    const sortedToken0 = token0.address < token1.address ? token0 : token1;
    const sortedToken1 = token0.address < token1.address ? token1 : token0;

    // Build pool key
    const poolKey = {
      token0: sortedToken0.address,
      token1: sortedToken1.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing),
      extension: params.extension
    };

    // Build bounds
    const bounds = {
      lower: {
        mag: Math.abs(params.lower_tick),
        sign: params.lower_tick < 0
      },
      upper: {
        mag: Math.abs(params.upper_tick),
        sign: params.upper_tick < 0
      }
    };

    // Build position parameters for removing liquidity
    const positionParams = {
      salt: '0x0', // Default salt, should match the one used when adding liquidity
      bounds,
      liquidity_delta: {
        mag: params.liquidity_amount,
        sign: true // true = negative (removing liquidity)
      }
    };

    // Connect contract to account
    contract.connect(env.account);

    const calls = [];

    // 1. Remove liquidity via update_position
    const updateCalldata = CallData.compile({
      pool_key: poolKey,
      params: positionParams
    });

    calls.push({
      contractAddress,
      entrypoint: 'update_position',
      calldata: updateCalldata
    });

    // 2. Optionally collect fees
    if (params.collect_fees) {
      const collectCalldata = CallData.compile({
        pool_key: poolKey,
        salt: '0x0',
        bounds
      });

      calls.push({
        contractAddress,
        entrypoint: 'collect_fees',
        calldata: collectCalldata
      });
    }

    // Execute all calls in a single transaction
    const result = await env.account.execute(calls);

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash: result.transaction_hash,
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
        liquidity_removed: params.liquidity_amount,
        lower_tick: params.lower_tick,
        upper_tick: params.upper_tick,
        fees_collected: params.collect_fees,
        pool_fee: params.fee
      }
    });
  } catch (error: any) {
    console.error('Error removing liquidity:', error);
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while removing liquidity'
    });
  }
};
