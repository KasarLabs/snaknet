import { RpcProvider } from 'starknet';

export const getSyncingStats = async (provider: RpcProvider) => {
  try {
    const syncingStats = await provider.getSyncingStats();

    return {
      status: 'success',
      syncingStats: syncingStats as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
