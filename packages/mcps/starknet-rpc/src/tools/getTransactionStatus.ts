import { RpcProvider } from 'starknet';

export const getTransactionStatus = async (
  provider: RpcProvider,
  params: { transactionHash: string }
) => {
  try {
    const transactionStatus = await provider.getTransactionStatus(
      params.transactionHash
    );

    return {
      status: 'success',
      transactionStatus: transactionStatus as any,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
