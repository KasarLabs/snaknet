// Endur.fi protocol contract addresses

export const endurfiAddress = {
  xSTRK: {
    mainnet:
      '0x28d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a',
    sepolia:
      '0x42de5b868da876768213c48019b8d46cd484e66013ae3275f8a4b97b31fc7eb',
  },
  withdrawQueueNFT: {
    mainnet: '0x518a66e579f9eb1603f5ffaeff95d3f013788e9c37ee94995555026b9648b6',
    sepolia:
      '0x254cbdaf8275cb1b514ae63ccedb04a3a9996b1489829e5d6bbaf759ac100b6',
  },
  validatorRegistry: {
    mainnet:
      '0x029edbca81c979decd6ee02205127e8b10c011bca1d337141170095eba690931',
    sepolia: '', // Not provided in docs
  },
} as const;

// STRK token address (required for approvals)
export const strkTokenAddress = {
  mainnet: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
  sepolia: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
} as const;
