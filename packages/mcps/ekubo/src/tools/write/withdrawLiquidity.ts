import { Contract, Account, constants } from 'starknet';
import { POSITIONS_ABI } from '../../lib/contracts/abi.js';
import { POSITIONS_ADDRESS, POSITIONS_NFT_ADDRESS } from '../../lib/contracts/addresses.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent, getChain } from '../../lib/utils/index.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { WithdrawLiquiditySchema } from '../../schemas/index.js';

export const withdrawLiquidity = async (
  env: any,
  params: WithdrawLiquiditySchema
) => {
  try {
    const account = env.account;
    const chain = await getChain(env.provider);
    const positionsAddress = POSITIONS_ADDRESS[chain];
    const positionsContract = new Contract(POSITIONS_ABI, positionsAddress, env.provider);

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
      { contract_address: sortedToken0.address }
    ]);

    // Clear token1 to receive withdrawn tokens
    const clearToken1Calldata = positionsContract.populate('clear', [
      { contract_address: sortedToken1.address }
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
        token0: sortedToken0.symbol,
        token1: sortedToken1.symbol,
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
