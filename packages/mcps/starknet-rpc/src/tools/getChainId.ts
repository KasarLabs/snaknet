import { RpcProvider } from 'starknet';

export const getChainId = async (provider: RpcProvider) => {
  try {
    const chainId = await provider.getChainId();

    return {
      status: 'success',
      chainId,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
