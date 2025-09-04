import { RpcProvider } from 'starknet';

export const getBlockWithReceipts = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithReceipts = await provider.getBlockWithReceipts(
      params.blockId
    );

    return JSON.stringify({
      status: 'success',
      blockWithReceipts,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
