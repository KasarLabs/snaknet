import { RpcProvider } from 'starknet';

export const getTransactionByBlockIdAndIndex = async (
  provider: RpcProvider,
  params: { blockId: string; index: number }
) => {
  try {
    const transaction = await provider.getTransactionByBlockIdAndIndex(
      params.blockId,
      params.index
    );

    return {
      status: 'success',
      transaction: transaction as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
