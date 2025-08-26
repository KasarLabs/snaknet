import { RpcProvider } from 'starknet';

export const getTransactionReceipt = async (provider: RpcProvider, params: { transactionHash: string }) => {
  try {
    const transactionReceipt = await provider.getTransactionReceipt(params.transactionHash);

    return JSON.stringify({
      status: 'success',
      transactionReceipt,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
