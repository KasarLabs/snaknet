import { RpcProvider } from 'starknet';

export const getClass = async (provider: RpcProvider, params: { classHash: string; blockId?: string }) => {
  try {
    const contractClass = await provider.getClass(params.classHash, params.blockId);

    return JSON.stringify({
      status: 'success',
      contractClass,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
