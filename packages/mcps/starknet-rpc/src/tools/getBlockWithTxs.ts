import { RpcProvider } from 'starknet';

export const getBlockWithTxs = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithTxs = await provider.getBlockWithTxs(params.blockId);

    return {
      status: 'success',
      blockWithTxs: blockWithTxs as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
