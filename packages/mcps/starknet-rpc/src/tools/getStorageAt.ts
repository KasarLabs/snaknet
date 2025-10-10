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

    return {
      status: 'success',
      storageValue,
    };
  } catch (error) {
    return {
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
