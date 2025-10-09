import { Account, RpcProvider } from 'starknet';

export interface envRead {
  provider: RpcProvider;
}

export interface envWrite {
  provider: RpcProvider;
  account: Account;
}

export type TokenType = 'STRK' | 'WBTC' | 'tBTC' | 'LBTC';

export interface TokenConfig {
  underlyingToken: {
    mainnet: string;
    sepolia: string;
  };
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
