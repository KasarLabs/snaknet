import { RpcProvider } from 'starknet';

export const getBlockNumber = async (provider: RpcProvider) => {
  try {
    const blockNumber = await provider.getBlockNumber();

    return {
      status: 'success',
      blockNumber,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
