import { RpcProvider } from 'starknet';

export const getBlockWithTxs = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithTxs = await provider.getBlockWithTxs(params.blockId);

    return JSON.stringify({
      status: 'success',
      blockWithTxs,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
