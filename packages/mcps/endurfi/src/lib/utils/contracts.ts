import { Contract, RpcProvider } from 'starknet';
import { TOKEN_CONFIG, TokenType } from '../constants/tokenConfig.js';
import {
  WITHDRAW_QUEUE_ABI,
  XSTRK_ABI,
  NEW_ERC20_ABI,
} from '../constants/abis/index.js';

// Determine network from RPC URL
export const getNetwork = (provider: RpcProvider): 'mainnet' | 'sepolia' => {
  const nodeUrl = provider.channel.nodeUrl;
  return nodeUrl.includes('sepolia') ? 'sepolia' : 'mainnet';
};

/**
 * Get the liquid staking token contract (xSTRK, xyWBTC, etc.) for a given token type
 */
export const getLiquidTokenContract = (
  provider: RpcProvider,
  tokenType: TokenType
): Contract => {
  const network = getNetwork(provider);
  const config = TOKEN_CONFIG[tokenType];
  const address = config.asset[network];

  if (!address) {
    throw new Error(`${tokenType} asset contract not available on ${network}`);
  }

  // All liquid tokens use the ERC4626 ABI (same as xSTRK)
  return new Contract(XSTRK_ABI, address, provider);
};

/**
 * Get the underlying token contract (STRK, WBTC, etc.) for a given token type
 */
export const getUnderlyingTokenContract = (
  provider: RpcProvider,
  tokenType: TokenType
): Contract => {
  const network = getNetwork(provider);
  const config = TOKEN_CONFIG[tokenType];
  const address = config.underlyingToken[network];

  if (!address) {
    throw new Error(
      `Underlying token address not configured for ${tokenType} on ${network}`
    );
  }

  return new Contract(NEW_ERC20_ABI, address, provider);
};

/**
 * Get the withdraw queue NFT contract for a given token type
 */
export const getWithdrawQueueNFTContract = (
  provider: RpcProvider,
  tokenType: TokenType
): Contract => {
  const network = getNetwork(provider);
  const config = TOKEN_CONFIG[tokenType];
  const address = config.withdrawQueue[network];

  if (!address) {
    throw new Error(
      `${tokenType} withdraw queue contract not available on ${network}`
    );
  }

  return new Contract(WITHDRAW_QUEUE_ABI, address, provider);
};

/**
 * Get the withdraw queue NFT contract address for a given token type
 */
export const getWithdrawQueueNFTAddress = (
  provider: RpcProvider,
  tokenType: TokenType
): string => {
  const network = getNetwork(provider);
  const config = TOKEN_CONFIG[tokenType];
  const address = config.withdrawQueue[network];

  if (!address) {
    throw new Error(
      `${tokenType} withdraw queue contract not available on ${network}`
    );
  }

  return address;
};

/**
 * Get the decimals for a given token type
 */
export const getTokenDecimals = (tokenType: TokenType): number => {
  return TOKEN_CONFIG[tokenType].decimals;
};

/**
 * Get the liquid token name for a given token type (e.g., "xSTRK", "xyWBTC")
 */
export const getLiquidTokenName = (tokenType: TokenType): string => {
  return TOKEN_CONFIG[tokenType].liquidTokenName;
};

/**
 * Get the underlying token name for a given token type (e.g., "STRK", "WBTC")
 */
export const getUnderlyingTokenName = (tokenType: TokenType): string => {
  return TOKEN_CONFIG[tokenType].underlyingTokenName;
};
