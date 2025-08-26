import { RpcProvider } from 'starknet';

export const getTransactionStatus = async (provider: RpcProvider, params: { transactionHash: string }) => {
  try {
    const transactionStatus = await provider.getTransactionStatus(params.transactionHash);

    return JSON.stringify({
      status: 'success',
      transactionStatus,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
