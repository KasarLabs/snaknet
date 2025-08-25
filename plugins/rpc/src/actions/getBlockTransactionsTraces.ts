import { RpcProvider } from 'starknet';

export const getBlockTransactionsTraces = async (provider: RpcProvider, params: { blockId: string }) => {
  try {
    const blockTransactionsTraces = await provider.getBlockTransactionsTraces(params.blockId);

    return JSON.stringify({
      status: 'success',
      blockTransactionsTraces,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
