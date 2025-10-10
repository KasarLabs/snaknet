import { RpcProvider } from 'starknet';

export const getBlockLatestAccepted = async (provider: RpcProvider) => {
  try {
    const blockHashAndNumber = await provider.getBlockLatestAccepted();

    return {
      status: 'success',
      blockHashAndNumber: blockHashAndNumber as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
