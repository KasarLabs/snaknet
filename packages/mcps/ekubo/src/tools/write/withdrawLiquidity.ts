import { getContract } from '../../lib/contracts/index.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/math.js';
import { preparePoolKeyFromParams } from '../../lib/utils/pools.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { WithdrawLiquiditySchema } from '../../schemas/index.js';

export const withdrawLiquidity = async (
  env: any,
  params: WithdrawLiquiditySchema
) => {
  try {
    const account = env.account;
    const positionsContract = await getContract(env.provider, 'positions');

    const { poolKey, token0, token1 } = await preparePoolKeyFromParams(
      env.provider,
      {
        token0: params.token0,
        token1: params.token1,
        fee: params.fee,
        tick_spacing: params.tick_spacing,
        extension: params.extension
      }
    );

    // Build bounds (price range)
    const bounds = {
      lower: {
        mag: BigInt(Math.abs(params.lower_tick)),
        sign: params.lower_tick < 0
      },
      upper: {
        mag: BigInt(Math.abs(params.upper_tick)),
        sign: params.upper_tick < 0
      }
    };

    // Determine liquidity and min amounts based on fees_only option
    const liquidity = params.fees_only ? 0 : BigInt(params.liquidity_amount);
    const minToken0 = 0; // Can be improved with slippage calculation
    const minToken1 = 0; // Can be improved with slippage calculation
    const collectFees = params.collect_fees ?? true;

    // Call withdraw on Positions contract
    positionsContract.connect(account);
    const withdrawCalldata = positionsContract.populate('withdraw', [
      params.position_id, // u64 position ID
      poolKey,
      bounds,
      liquidity,
      minToken0,
      minToken1,
      collectFees
    ]);

    // Clear token0 to receive withdrawn tokens
    const clearToken0Calldata = positionsContract.populate('clear', [
      { contract_address: token0.address }
    ]);

    // Clear token1 to receive withdrawn tokens
    const clearToken1Calldata = positionsContract.populate('clear', [
      { contract_address: token1.address }
    ]);

    // Execute withdraw + clear transactions
    const { transaction_hash } = await account.execute([
      withdrawCalldata,
      clearToken0Calldata,
      clearToken1Calldata
    ]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash,
        token0: token0.symbol,
        token1: token1.symbol,
        position_id: params.position_id,
        liquidity_withdrawn: liquidity.toString(),
        fees_only: params.fees_only,
        collect_fees: collectFees
      }
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while withdrawing liquidity'
    });
  }
};
