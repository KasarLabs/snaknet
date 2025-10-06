export function calculateActualPrice(
  sqrtPrice: bigint,
  token0Decimals: number,
  token1Decimals: number
): number {
  const Q128 = BigInt(2) ** BigInt(128);
  const sqrtPriceFloat = Number(sqrtPrice) / Number(Q128);
  const rawPrice = sqrtPriceFloat * sqrtPriceFloat;

  // Adjust for decimal difference (token1/token0 format)
  // Per Ekubo docs: multiply by 10^(token0_decimals - token1_decimals)
  const decimalAdjustment = 10 ** (token0Decimals - token1Decimals);
  return rawPrice * decimalAdjustment;
}

export function calculateTickFromSqrtPrice(sqrtPrice: bigint): number {
  const Q128 = BigInt(2) ** BigInt(128);
  const sqrtPriceFloat = Number(sqrtPrice) / Number(Q128);
  const price = sqrtPriceFloat * sqrtPriceFloat;
  // tick = log_base(1.0001)(price)
  return Math.floor(Math.log(price) / Math.log(1.0001));
}

/**
 * Convert fee percentage to Ekubo's internal fee representation
 * @param feePercent Fee as a percentage (e.g., 0.05 for 0.05%, 0.3 for 0.3%, 1 for 1%)
 * @returns Fee in Ekubo's u128 format as a string
 *
 * Formula: fee_u128 = (fee_percent / 100) * 2^128
 *
 * Examples:
 * - 0.05% -> "170141183460469231731687303715884105728"
 * - 0.3% -> "1020847100762815390390123822295304634368"
 * - 1% -> "3402823669209384634633746074317682114560"
 */
export function convertFeePercentToU128(feePercent: number): string {
  // Convert percentage to decimal (0.05% -> 0.0005)
  const feeDecimal = feePercent / 100;

  // Calculate fee * 2^128
  // We use BigInt for precision with large numbers
  const TWO_POW_128 = BigInt(2) ** BigInt(128);
  const feeU128 = BigInt(Math.floor(feeDecimal * Number(TWO_POW_128)));

  return feeU128.toString();
}

/**
 * Convert tick spacing percentage to tick exponent
 * @param tickSpacingPercent Tick spacing as a percentage (e.g., 0.01 for 0.01%, 0.1 for 0.1%, 1 for 1%)
 * @returns Tick spacing as an integer exponent
 *
 * Formula: tick_spacing = log_base(1.000001)(1 + tick_spacing_percent / 100)
 *
 * Per Ekubo docs: "The tick spacing of 0.01% is represented as an exponent of 1.000001,
 * so it can be computed as log base 1.000001 of 1.001, which is roughly equal to 1000"
 *
 * Examples:
 * - 0.01% -> ~1000
 * - 0.05% -> ~5000
 * - 0.1% -> ~10000
 * - 1% -> ~100000
 */
export function convertTickSpacingPercentToExponent(tickSpacingPercent: number): number {
  // Convert percentage to decimal (0.01% -> 0.0001)
  const spacingDecimal = tickSpacingPercent / 100;

  // Calculate log_base(1.000001)(1 + spacing_decimal)
  // log_base(a)(b) = ln(b) / ln(a)
  const tickSpacing = Math.log(1 + spacingDecimal) / Math.log(1.000001);
  return Math.round(tickSpacing);
}
