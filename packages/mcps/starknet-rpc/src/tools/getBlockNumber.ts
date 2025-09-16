import { RpcProvider } from 'starknet';

export const getBlockNumber = async (provider: RpcProvider) => {
  try {
    const blockNumber = await provider.getBlockNumber();

    return JSON.stringify({
      status: 'success',
      blockNumber,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
