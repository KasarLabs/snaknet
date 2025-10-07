import { cairo } from 'starknet';
import { MIN_SQRT_RATIO, MAX_SQRT_RATIO } from '@ekubo/starknet-sdk';

/**
 * Builds a RouteNode for Ekubo Router swap
 */
export function buildRouteNode(poolKey: any, sqrtRatioLimit: string) {
  return {
    pool_key: poolKey,
    sqrt_ratio_limit: cairo.uint256(sqrtRatioLimit),
    skip_ahead: 0,
  };
}

/**
 * Builds a TokenAmount for Ekubo Router swap
 */
export function buildTokenAmount(
  tokenAddress: string,
  amount: string,
  isAmountIn: boolean
) {
  return {
    token: tokenAddress,
    amount: {
      mag: BigInt(amount),
      sign: !isAmountIn, // false = positive (exact input), true = negative (exact output)
    },
  };
}

/**
 * Calculates sqrt_ratio_limit based on current price and slippage tolerance
 */
export function calculateSqrtRatioLimit(
  currentSqrtPrice: bigint,
  slippageTolerance: number,
  isTokenALower: boolean
): string {
  if (isTokenALower) {
    const slippageMultiplier = 1 - slippageTolerance / 100;
    const calculatedLimit = BigInt(
      Math.floor(Number(currentSqrtPrice) * Math.sqrt(slippageMultiplier))
    );
    return calculatedLimit < currentSqrtPrice &&
      calculatedLimit >= MIN_SQRT_RATIO
      ? calculatedLimit.toString()
      : MIN_SQRT_RATIO.toString();
  } else {
    const slippageMultiplier = 1 + slippageTolerance / 100;
    const calculatedLimit = BigInt(
      Math.floor(Number(currentSqrtPrice) * Math.sqrt(slippageMultiplier))
    );
    return calculatedLimit > currentSqrtPrice &&
      calculatedLimit <= MAX_SQRT_RATIO
      ? calculatedLimit.toString()
      : MAX_SQRT_RATIO.toString();
  }
}
