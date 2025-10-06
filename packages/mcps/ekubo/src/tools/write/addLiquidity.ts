import { getERC20Contract } from '../../lib/contracts/index.js';
import { getContract } from '../../lib/utils/contracts.js';
import { AddLiquiditySchema } from '../../schemas/index.js';
import { preparePoolKeyFromParams } from '../../lib/utils/pools.js';

export const addLiquidity = async (
  env: any,
  params: AddLiquiditySchema
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

    const amount0 = token0.address < token1.address ? params.amount0 : params.amount1;
    const amount1 = token0.address < token1.address ? params.amount1 : params.amount0;

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

    // Min liquidity (set to 0 for now)
    const minLiquidity = 0;

    // Transfer token0 to Positions contract
    const token0Contract = getERC20Contract(token0.address, env.provider);
    token0Contract.connect(account);
    const transfer0Calldata = token0Contract.populate('transfer', [positionsContract.address, amount0]);

    // Transfer token1 to Positions contract
    const token1Contract = getERC20Contract(token1.address, env.provider);
    token1Contract.connect(account);
    const transfer1Calldata = token1Contract.populate('transfer', [positionsContract.address, amount1]);

    // Call deposit with position_id
    positionsContract.connect(account);
    const depositCalldata = positionsContract.populate('deposit', [
      params.position_id,
      poolKey,
      bounds,
      minLiquidity
    ]);

    // Clear token0
    const clearToken0Calldata = positionsContract.populate('clear', [
      { contract_address: token0.address }
    ]);

    // Clear token1
    const clearToken1Calldata = positionsContract.populate('clear', [
      { contract_address: token1.address }
    ]);

    // Execute all in a single V3 transaction: transfer token0, transfer token1, deposit, clear token0, clear token1
    const { transaction_hash } = await account.execute([
      transfer0Calldata,
      transfer1Calldata,
      depositCalldata,
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
        position_id: params.position_id,
        token0: token0.symbol,
        token1: token1.symbol,
        amount0: amount0,
        amount1: amount1,
        lower_tick: params.lower_tick,
        upper_tick: params.upper_tick,
        pool_fee: params.fee
      }
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while adding liquidity'
    });
  }
};
