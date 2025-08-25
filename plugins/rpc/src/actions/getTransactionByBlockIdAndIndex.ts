import { RpcProvider } from 'starknet';

export const getTransactionByBlockIdAndIndex = async (provider: RpcProvider, params: { blockId: string; index: number }) => {
  try {
    const transaction = await provider.getTransactionByBlockIdAndIndex(params.blockId, params.index);

    return JSON.stringify({
      status: 'success',
      transaction,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
