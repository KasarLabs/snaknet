import { RpcProvider } from 'starknet';

export const getBlockWithReceipts = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithReceipts = await provider.getBlockWithReceipts(
      params.blockId
    );

    return {
      status: 'success',
      blockWithReceipts: blockWithReceipts as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
