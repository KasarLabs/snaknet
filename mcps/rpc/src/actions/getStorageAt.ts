import { RpcProvider } from 'starknet';

export const getStorageAt = async (
  provider: RpcProvider,
  params: { contractAddress: string; key: string; blockId?: string }
) => {
  try {
    const storageValue = await provider.getStorageAt(
      params.contractAddress,
      params.key,
      params.blockId
    );

    return JSON.stringify({
      status: 'success',
      storageValue,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
