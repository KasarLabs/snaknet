// Configuration for all supported tokens on Endur.fi

export type TokenType = 'STRK' | 'WBTC' | 'tBTC' | 'LBTC';

export interface TokenConfig {
  asset: {
    mainnet: string;
    sepolia: string;
  };
  withdrawQueue: {
    mainnet: string;
    sepolia: string;
  };
  decimals: number;
  liquidTokenName: string;
  underlyingTokenName: string;
}

export const TOKEN_CONFIG: Record<TokenType, TokenConfig> = {
  STRK: {
    asset: {
      mainnet: '0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a',
      sepolia: '0x42de5b868da876768213c48019b8d46cd484e66013ae3275f8a4b97b31fc7eb',
    },
    withdrawQueue: {
      mainnet: '0x518a66e579f9eb1603f5ffaeff95d3f013788e9c37ee94995555026b9648b6',
      sepolia: '0x254cbdaf8275cb1b514ae63ccedb04a3a9996b1489829e5d6bbaf759ac100b6',
    },
    decimals: 18,
    liquidTokenName: 'xSTRK',
    underlyingTokenName: 'STRK',
  },
  WBTC: {
    asset: {
      mainnet: '0x6a567e68c805323525fe1649adb80b03cddf92c23d2629a6779f54192dffc13',
      sepolia: '', // Not available yet
    },
    withdrawQueue: {
      mainnet: '0x670cdfa77487203cdf11d58db9617988d3a8fc2b22730594ed7d193a0430f72',
      sepolia: '', // Not available yet
    },
    decimals: 8,
    liquidTokenName: 'xyWBTC',
    underlyingTokenName: 'WBTC',
  },
  tBTC: {
    asset: {
      mainnet: '0x43a35c1425a0125ef8c171f1a75c6f31ef8648edcc8324b55ce1917db3f9b91',
      sepolia: '', // Not available yet
    },
    withdrawQueue: {
      mainnet: '0x35b194007fb5d9fd10cb1f8772ef45cced853e7b3239367de0e19ecba85d75a',
      sepolia: '', // Not available yet
    },
    decimals: 8,
    liquidTokenName: 'xytBTC',
    underlyingTokenName: 'tBTC',
  },
  LBTC: {
    asset: {
      mainnet: '0x7dd3c80de9fcc5545f0cb83678826819c79619ed7992cc06ff81fc67cd2efe0',
      sepolia: '', // Not available yet
    },
    withdrawQueue: {
      mainnet: '0x293caaca81259f02f17bd85de5056624626fc7cb25ff79f104c3ef07a4649ec',
      sepolia: '', // Not available yet
    },
    decimals: 8,
    liquidTokenName: 'xyLBTC',
    underlyingTokenName: 'LBTC',
  },
} as const;

/**
 * Get token configuration for a specific token type
 */
export function getTokenConfig(tokenType: TokenType): TokenConfig {
  return TOKEN_CONFIG[tokenType];
}

/**
 * Get the underlying token address (STRK, WBTC, etc.) for a network
 */
export function getUnderlyingTokenAddress(
  tokenType: TokenType,
  network: 'mainnet' | 'sepolia'
): string {
  const config = getTokenConfig(tokenType);

  // STRK has different addresses
  if (tokenType === 'STRK') {
    const strkAddresses = {
      mainnet: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
      sepolia: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    };
    return strkAddresses[network];
  }

  // For BTC tokens, we'll need to add their addresses
  // TODO: Add WBTC, tBTC, LBTC token addresses
  throw new Error(`Underlying token address not configured for ${tokenType} on ${network}`);
}
