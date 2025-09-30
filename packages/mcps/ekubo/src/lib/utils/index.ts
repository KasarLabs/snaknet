import { RpcProvider, shortString } from 'starknet';
import { CORE_ADDRESS } from '../contracts/addresses.js';

export async function getChain(provider: RpcProvider) {
    const chainId =  shortString.decodeShortString(await provider.getChainId());
    return (chainId === 'SN_MAIN' ? 'mainnet' : 'sepolia');
}

export async function getContractAddress(provider: RpcProvider) {
    const chain = await getChain(provider);
    return CORE_ADDRESS[chain];
}

export function calculateActualPrice(sqrtPrice: bigint): number {
  const Q128 = BigInt(2) ** BigInt(128);
  const sqrtPriceFloat = Number(sqrtPrice) / Number(Q128);
  return sqrtPriceFloat * sqrtPriceFloat;
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
