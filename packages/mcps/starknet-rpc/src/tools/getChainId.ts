import { RpcProvider } from 'starknet';

export const getChainId = async (provider: RpcProvider) => {
  try {
    const chainId = await provider.getChainId();

    return JSON.stringify({
      status: 'success',
      chainId,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
