import { RpcProvider } from 'starknet';

export const getTransactionByHash = async (
  provider: RpcProvider,
  params: { transactionHash: string }
) => {
  try {
    const transaction = await provider.getTransactionByHash(
      params.transactionHash
    );

    return {
      status: 'success',
      transaction: transaction as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
