import { GetTransactionReceiptResponse } from 'starknet';

/**
 * ERC721 Transfer event key
 * keccak256("Transfer(address,address,uint256)")
 */
const TRANSFER_EVENT_KEY =
  '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9';

/**
 * Extracts the position ID from a mint transaction receipt by looking for
 * the ERC721 Transfer event from address 0x0 (mint event)
 *
 * @param receipt - The transaction receipt
 * @param nftContractAddress - The NFT contract address to filter events
 * @returns The position ID as a string, or undefined if not found
 */
export function extractPositionIdFromReceipt(
  receipt: GetTransactionReceiptResponse,
  nftContractAddress: string
): string | undefined {
  if (!('events' in receipt) || !Array.isArray(receipt.events)) {
    return undefined;
  }

  // Normalize the NFT contract address by removing the '0x' prefix and any leading zeros
  const normalizedNftAddress = nftContractAddress
    .toLowerCase()
    .replace(/^0x0*/, '0x');

  for (const event of receipt.events) {
    if (
      event.from_address === normalizedNftAddress &&
      event.keys?.[0] === TRANSFER_EVENT_KEY
    ) {
      const fromAddress = event.data?.[0];
      // A mint event has from_address = 0x0
      if (fromAddress === '0x0') {
        const positionId = event.data?.[2];
        return positionId ? BigInt(positionId).toString() : undefined;
      }
    }
  }

  return undefined;
}
