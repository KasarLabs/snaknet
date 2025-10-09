import { GetTransactionReceiptResponse } from 'starknet';

/**
 * ERC721 Transfer event key
 * keccak256("Transfer(address,address,uint256)")
 */
const TRANSFER_EVENT_KEY =
  '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9';

/**
 * Extracts the withdraw_request_id (NFT ID) from a redeem transaction receipt
 * by looking for the ERC721 Transfer event from address 0x0 (mint event)
 *
 * @param receipt - The transaction receipt from the redeem call
 * @param withdrawQueueNftAddress - The WithdrawQueue NFT contract address
 * @returns The withdraw_request_id as a string, or undefined if not found
 */
export function extractWithdrawRequestIdFromReceipt(
  receipt: GetTransactionReceiptResponse,
  withdrawQueueNftAddress: string
): string | undefined {
  if (!('events' in receipt) || !Array.isArray(receipt.events)) {
    return undefined;
  }

  // Normalize the NFT contract address by removing the '0x' prefix and any leading zeros
  const normalizedNftAddress = withdrawQueueNftAddress
    .toLowerCase()
    .replace(/^0x0*/, '0x');

  for (const event of receipt.events) {
    if (
      event.from_address === normalizedNftAddress &&
      event.keys?.[0] === TRANSFER_EVENT_KEY
    ) {
      const fromAddress = event.keys?.[1];
      // A mint event has from_address = 0x0
      if (fromAddress === '0x0') {
        // Token ID is in keys[3] (u256 - token IDs are typically small so high part is usually 0)
        const tokenIdLow = event.keys?.[3];

        if (tokenIdLow) {
          return BigInt(tokenIdLow).toString();
        }
      }
    }
  }

  return undefined;
}
