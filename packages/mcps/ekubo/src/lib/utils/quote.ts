import { cairo, Contract } from 'starknet';

/**
 * Fetches a swap quote from the Ekubo Router
 */
export async function getSwapQuote(
  routerContract: Contract,
  routeNode: any,
  tokenAmount: any
) {
  return await routerContract.quote_swap(routeNode, tokenAmount);
}

/**
 * Extracts expected output amount from quote based on swap direction
 */
export function extractExpectedOutput(
  quote: any,
  isTokenALower: boolean
): bigint {
  // If selling token0 (lower), receive token1
  // If selling token1 (higher), receive token0
  return isTokenALower ? quote.amount1.mag : quote.amount0.mag;
}

/**
 * Calculates minimum output amount with slippage tolerance
 */
export function calculateMinimumOutput(
  expectedOutput: bigint,
  slippageTolerance: number
): string {
  const slippageMultiplier = 1 - (slippageTolerance / 100);
  const minimumAmount = BigInt(Math.floor(Number(expectedOutput) * slippageMultiplier));
  return minimumAmount.toString();
}

/**
 * Calculates minimum output with slippage and returns cairo.uint256 format
 */
export function calculateMinimumOutputU256(
  expectedOutput: bigint,
  slippageTolerance: number
) {
  const minimumAmountStr = calculateMinimumOutput(expectedOutput, slippageTolerance);
  return cairo.uint256(minimumAmountStr);
}
