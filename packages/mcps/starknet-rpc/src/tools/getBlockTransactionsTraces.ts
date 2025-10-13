import { RpcProvider } from 'starknet';

export const getBlockTransactionsTraces = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockTransactionsTraces = await provider.getBlockTransactionsTraces(
      params.blockId
    );

    return {
      status: 'success',
      blockTransactionsTraces: blockTransactionsTraces as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
