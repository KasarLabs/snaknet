import { RpcProvider } from 'starknet';

export const getBlockTransactionCount = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockTransactionCount = await provider.getBlockTransactionCount(
      params.blockId
    );

    return JSON.stringify({
      status: 'success',
      blockTransactionCount,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
