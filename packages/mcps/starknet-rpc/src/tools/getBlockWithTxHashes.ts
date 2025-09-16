import { RpcProvider } from 'starknet';

export const getBlockWithTxHashes = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithTxHashes = await provider.getBlockWithTxHashes(
      params.blockId
    );

    return JSON.stringify({
      status: 'success',
      blockWithTxHashes,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
