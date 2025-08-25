import { RpcProvider } from 'starknet';

export const getSyncingStats = async (provider: RpcProvider) => {
  try {
    const syncingStats = await provider.getSyncingStats();

    return JSON.stringify({
      status: 'success',
      syncingStats,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
