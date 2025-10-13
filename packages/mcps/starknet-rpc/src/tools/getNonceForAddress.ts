import { RpcProvider } from 'starknet';

export const getNonceForAddress = async (
  provider: RpcProvider,
  params: { contractAddress: string; blockId?: string }
) => {
  try {
    const nonce = await provider.getNonceForAddress(
      params.contractAddress,
      params.blockId
    );

    return {
      status: 'success',
      nonce,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
