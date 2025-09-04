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

    return JSON.stringify({
      status: 'success',
      nonce,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
