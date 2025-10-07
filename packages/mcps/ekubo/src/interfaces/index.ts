import { Account, RpcProvider } from 'starknet';

export interface EnvParams {
  provider: RpcProvider;
  account: Account;
}

export interface CompletePoolInfo {
  price: bigint;
  liquidity: bigint;
  fees_per_liquidity: {
    fee_growth_global_0: bigint;
    fee_growth_global_1: bigint;
  };
  current_tick: number;
}

export interface envRead {
  provider: RpcProvider;
}

export interface envWrite {
  provider: RpcProvider;
  account: Account;
}