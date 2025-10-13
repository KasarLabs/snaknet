import { RpcProvider } from 'starknet';

export const getClass = async (
  provider: RpcProvider,
  params: { classHash: string; blockId?: string }
) => {
  try {
    const contractClass = await provider.getClass(
      params.classHash,
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
