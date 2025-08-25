import { RpcProvider } from 'starknet';

export const getClassHash = async (provider: RpcProvider, params: { contractAddress: string; blockId?: string }) => {
  try {
    const classHash = await provider.getClassHashAt(params.contractAddress, params.blockId);

    return JSON.stringify({
      status: 'success',
      classHash,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
