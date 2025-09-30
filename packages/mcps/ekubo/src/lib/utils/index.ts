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

export function calculateActualPrice(sqrtPriceX96: bigint): number {
  const Q96 = BigInt(2) ** BigInt(96);
  const sqrtPriceFloat = Number(sqrtPriceX96) / Number(Q96);
  return sqrtPriceFloat * sqrtPriceFloat;
}

export function calculateTickFromSqrtPrice(sqrtPriceX96: bigint): number {
  const Q96 = BigInt(2) ** BigInt(96);
  const sqrtPrice = Number(sqrtPriceX96) / Number(Q96);
  const price = sqrtPrice * sqrtPrice;
  // tick = log_base(1.0001)(price)
  return Math.floor(Math.log(price) / Math.log(1.0001));
}
