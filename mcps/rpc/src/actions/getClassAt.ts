import { RpcProvider } from 'starknet';

export const getClassAt = async (
  provider: RpcProvider,
  params: { contractAddress: string; blockId?: string }
) => {
  try {
    const contractClass = await provider.getClassAt(
      params.contractAddress,
      params.blockId
    );

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
