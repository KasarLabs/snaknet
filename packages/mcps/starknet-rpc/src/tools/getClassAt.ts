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

    return {
      status: 'success',
      contractClass,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
