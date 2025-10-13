import { RpcProvider } from 'starknet';

export const getClassHashAt = async (
  provider: RpcProvider,
  params: { contractAddress: string; blockId?: string }
) => {
  try {
    const classHash = await provider.getClassHashAt(
      params.contractAddress,
      params.blockId
    );

    return {
      status: 'success',
      classHash,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
