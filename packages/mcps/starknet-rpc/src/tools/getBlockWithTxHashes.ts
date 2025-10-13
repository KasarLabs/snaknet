import { RpcProvider } from 'starknet';

export const getBlockWithTxHashes = async (
  provider: RpcProvider,
  params: { blockId: string }
) => {
  try {
    const blockWithTxHashes = await provider.getBlockWithTxHashes(
      params.blockId
    );

    return {
      status: 'success',
      blockWithTxHashes: blockWithTxHashes as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
