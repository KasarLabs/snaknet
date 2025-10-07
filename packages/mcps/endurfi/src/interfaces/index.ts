import { Account, RpcProvider } from 'starknet';

export interface envRead {
  provider: RpcProvider;
}

export interface envWrite {
  provider: RpcProvider;
  account: Account;
}
