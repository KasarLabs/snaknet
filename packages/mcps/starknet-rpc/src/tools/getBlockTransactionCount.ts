import { RpcProvider } from 'starknet';

export const getBlockTransactionCount = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockTransactionCount = await provider.getBlockTransactionCount(
      params.blockId
    );

    return {
      status: 'success',
      blockTransactionCount,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
