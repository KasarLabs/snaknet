import { RpcProvider } from 'starknet';

export const getBlockStateUpdate = async (provider: RpcProvider, params: { blockId: string }) => {
  try {
    const blockStateUpdate = await provider.getStateUpdate(params.blockId);

    return JSON.stringify({
      status: 'success',
      blockStateUpdate,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
