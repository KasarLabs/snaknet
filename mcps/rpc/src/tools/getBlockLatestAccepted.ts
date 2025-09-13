import { RpcProvider } from 'starknet';

export const getBlockLatestAccepted = async (provider: RpcProvider) => {
  try {
    const blockHashAndNumber = await provider.getBlockLatestAccepted();

    return JSON.stringify({
      status: 'success',
      blockHashAndNumber,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
