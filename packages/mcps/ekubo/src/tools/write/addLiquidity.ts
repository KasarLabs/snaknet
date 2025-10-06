import { getERC20Contract } from '../../lib/contracts/index.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/math.js';
import { getContract } from '../../lib/utils/contracts.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { AddLiquiditySchema } from '../../schemas/index.js';

export const addLiquidity = async (
  env: any,
  params: AddLiquiditySchema
) => {
  try {
    const account = env.account;
    const positionsContract = await getContract(env.provider, 'positions');

    // Validate tokens
    const { assetSymbol: symbol0, assetAddress: address0 } = extractAssetInfo(params.token0);
    const { assetSymbol: symbol1, assetAddress: address1 } = extractAssetInfo(params.token1);

    const token0: validToken = await validateToken(env.provider, symbol0, address0);
    const token1: validToken = await validateToken(env.provider, symbol1, address1);

    // Sort tokens by address (Ekubo requirement)
    const sortedToken0 = token0.address < token1.address ? token0 : token1;
    const sortedToken1 = token0.address < token1.address ? token1 : token0;
    const sortedAmount0 = token0.address < token1.address ? params.amount0 : params.amount1;
    const sortedAmount1 = token0.address < token1.address ? params.amount1 : params.amount0;

    // Build pool key
    const poolKey = {
      token0: sortedToken0.address,
      token1: sortedToken1.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing),
      extension: params.extension
    };
  
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
    const token0Contract = getERC20Contract(sortedToken0.address, env.provider);
    token0Contract.connect(account);
    const transfer0Calldata = token0Contract.populate('transfer', [positionsContract.address, sortedAmount0]);

    // Transfer token1 to Positions contract
    const token1Contract = getERC20Contract(sortedToken1.address, env.provider);
    token1Contract.connect(account);
    const transfer1Calldata = token1Contract.populate('transfer', [positionsContract.address, sortedAmount1]);

    // Call deposit with position_id
    positionsContract.connect(account);
    const depositCalldata = positionsContract.populate('deposit', [
      params.position_id, // u64 position ID
      poolKey,
      bounds,
      minLiquidity
    ]);

    // Clear token0
    const clearToken0Calldata = positionsContract.populate('clear', [
      { contract_address: sortedToken0.address }
    ]);

    // Clear token1
    const clearToken1Calldata = positionsContract.populate('clear', [
      { contract_address: sortedToken1.address }
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
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
        amount0: sortedAmount0,
        amount1: sortedAmount1,
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
