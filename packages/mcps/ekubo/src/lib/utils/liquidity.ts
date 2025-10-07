/**
 * Builds bounds object for liquidity position (price range)
 */
export function buildBounds(lowerTick: number, upperTick: number) {
  return {
    lower: {
      mag: BigInt(Math.abs(lowerTick)),
      sign: lowerTick < 0,
    },
    upper: {
      mag: BigInt(Math.abs(upperTick)),
      sign: upperTick < 0,
    },
  };
}

/**
 * Sorts amounts based on token order (ensures amount0/amount1 match sorted token0/token1)
 */
export function sortAmounts(
  amount0Input: string,
  amount1Input: string,
  isTokenALower: boolean
): { amount0: string; amount1: string } {
  return {
    amount0: isTokenALower ? amount0Input : amount1Input,
    amount1: isTokenALower ? amount1Input : amount0Input,
  };
}
