import { RpcProvider } from 'starknet';

export const getTransactionByHash = async (provider: RpcProvider, params: { transactionHash: string }) => {
  try {
    const transaction = await provider.getTransactionByHash(params.transactionHash);

    return JSON.stringify({
      status: 'success',
      transaction,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
