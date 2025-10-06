import { RpcProvider, Contract, Account, CallData, cairo, constants } from 'starknet';
import { ROUTER_ABI } from '../../lib/abis/index.js';
import { getERC20Contract } from '../../lib/contracts/index.js';
import { convertFeePercentToU128, convertTickSpacingPercentToExponent } from '../../lib/utils/math.js';
import { getChain, getContract } from '../../lib/utils/contracts.js';
import { extractAssetInfo, validateToken, validToken } from '../../lib/utils/token.js';
import { SwapTokensSchema } from '../../schemas/index.js';

export const swap = async (
  env: any,
  params: SwapTokensSchema
) => {
  try {
    const account = env.account;
    const routerContract = await getContract(env.provider, 'routerV3');
    const coreContract = await getContract(env.provider, 'core');

    // Validate tokens
    const { assetSymbol: tokenInSymbol, assetAddress: tokenInAddress } = extractAssetInfo(params.token_in);
    const { assetSymbol: tokenOutSymbol, assetAddress: tokenOutAddress } = extractAssetInfo(params.token_out);

    const tokenIn: validToken = await validateToken(env.provider, tokenInSymbol, tokenInAddress);
    const tokenOut: validToken = await validateToken(env.provider, tokenOutSymbol, tokenOutAddress);
    console.error("Tokens validated");

    // Build pool key (tokens must be sorted)
    const poolKey = {
      token0: tokenIn.address < tokenOut.address ? tokenIn.address : tokenOut.address,
      token1: tokenIn.address < tokenOut.address ? tokenOut.address : tokenIn.address,
      fee: convertFeePercentToU128(params.fee),
      tick_spacing: convertTickSpacingPercentToExponent(params.tick_spacing),
      extension: params.extension
    };
    console.error("Pool key built");

    // Get current pool price for slippage calculation
    const priceResult = await coreContract.get_pool_price(poolKey);
    console.error("Pool price:", priceResult.sqrt_ratio);
    const currentSqrtPrice = BigInt(priceResult.sqrt_ratio);

    // Calculate sqrt_ratio_limit based on slippage and swap direction
    // Per Ekubo docs: "if your swap increases token0 balance of the pool,
    // your sqrt_ratio_limit must be greater than current sqrt_ratio"
    //
    // When selling token0: token1 increases in pool → sqrt_ratio DECREASES → limit must be LESS than current
    // When selling token1: token0 increases in pool → sqrt_ratio INCREASES → limit must be GREATER than current
    const isSellingToken0 = tokenIn.address < tokenOut.address;

    // Min and max sqrt_ratio values (from Ekubo bounds)
    const MIN_SQRT_RATIO = BigInt("18446748437148339061");
    const MAX_SQRT_RATIO = BigInt("6277100250585753475930931601400621808602321654880405518632");

    let sqrtRatioLimit: string;
    if (isSellingToken0) {
      // Selling token0: token1 increases in pool, sqrt_ratio DECREASES
      // Set LOWER limit (with slippage protection)
      const slippageMultiplier = 1 - (params.slippage_tolerance / 100);
      const calculatedLimit = BigInt(Math.floor(Number(currentSqrtPrice) * Math.sqrt(slippageMultiplier)));
      sqrtRatioLimit = calculatedLimit < currentSqrtPrice && calculatedLimit >= MIN_SQRT_RATIO
        ? calculatedLimit.toString()
        : MIN_SQRT_RATIO.toString();
    } else {
      // Selling token1: token0 increases in pool, sqrt_ratio INCREASES
      // Set UPPER limit (with slippage protection)
      const slippageMultiplier = 1 + (params.slippage_tolerance / 100);
      const calculatedLimit = BigInt(Math.floor(Number(currentSqrtPrice) * Math.sqrt(slippageMultiplier)));
      sqrtRatioLimit = calculatedLimit > currentSqrtPrice && calculatedLimit <= MAX_SQRT_RATIO
        ? calculatedLimit.toString()
        : MAX_SQRT_RATIO.toString();
    }

    // Convert sqrt_ratio_limit to u256 format using cairo utility
    const limitU256 = cairo.uint256(sqrtRatioLimit);

    // Build RouteNode for Router
    const routeNode = {
      pool_key: poolKey,
      sqrt_ratio_limit: limitU256,
      skip_ahead: 0
    };

    // Build TokenAmount for Router
    const tokenAmount = {
      token: tokenIn.address,
      amount: {
        mag: BigInt(params.amount),
        sign: !params.is_amount_in // false = positive (exact input), true = negative (exact output)
      }
    };

    // 1. D'abord, appeler quote_swap (read-only, pas dans la transaction)
    const quote = await routerContract.quote_swap(routeNode, tokenAmount);

    // 2. Le quote retourne un Delta avec amount0 et amount1
    // Selon la direction du swap, prendre le bon montant
    const expectedOutput = isSellingToken0 
      ? quote.amount1.mag  // Si on vend token0, on reçoit token1
      : quote.amount0.mag; // Si on vend token1, on reçoit token0

      // 3. Calculer le minimum avec slippage
    const slippageMultiplier = 1 - (params.slippage_tolerance / 100);
    const minimumAmount = BigInt(Math.floor(Number(expectedOutput) * slippageMultiplier));
    const minimumOutput = cairo.uint256(minimumAmount.toString());
    
    // Transfer tokens to Router before swap
    // The Router expects tokens to be already transferred
    const tokenInContract = getERC20Contract(tokenIn.address, env.provider);
    tokenInContract.connect(account);
    const transferCalldata = tokenInContract.populate('transfer', [routerContract.address, params.amount]);
    console.error("Transfer populated");

    routerContract.connect(account);
    const swapCalldata = routerContract.populate('swap', [routeNode, tokenAmount]);
    console.error("Swap populated");

    const clearMinimumCalldata = routerContract.populate('clear_minimum', [
      { contract_address: tokenOut.address }, 
      minimumOutput
    ]);
    console.error("Clear minimum populated");

    const clearCalldata = routerContract.populate('clear', [{ contract_address: tokenOut.address }]);
    console.error("Clear populated");

    // Execute all in a single V3 transaction: transfer, swap, clear_minimum, clear
    const { transaction_hash } = await account.execute([
      transferCalldata,
      swapCalldata,
      clearMinimumCalldata,
      clearCalldata
    ]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash: transaction_hash,
        token_in: tokenIn.symbol,
        token_out: tokenOut.symbol,
        amount: params.amount,
        is_amount_in: params.is_amount_in,
        pool_fee: params.fee,
        slippage_tolerance: params.slippage_tolerance
      }
    });
  } catch (error: any) {
    // console.error('Error swapping tokens:', error);
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error during swap'
    });
  }
};
