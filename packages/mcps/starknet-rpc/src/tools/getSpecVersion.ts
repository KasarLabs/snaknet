import { RpcProvider } from 'starknet';

export const getSpecVersion = async (provider: RpcProvider) => {
  try {
    const specVersion = await provider.getSpecVersion();

    return {
      status: 'success',
      specVersion,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
