import { Contract, Account, constants, cairo } from 'starknet';
import { NFT_POSITIONS_CONTRACT_ABI } from '../../lib/contracts/abi.js';
import { POSITIONS_NFT_ADDRESS } from '../../lib/contracts/addresses.js';
import { getChain } from '../../lib/utils/index.js';
import { z } from 'zod';

const transferPositionSchema = z.object({
  position_id: z
    .number()
    .describe('The NFT position ID to transfer (u64)'),
  to_address: z
    .string()
    .describe('The recipient address to transfer the position to')
});

type TransferPositionSchema = z.infer<typeof transferPositionSchema>;

export const transferPosition = async (
  env: any,
  params: TransferPositionSchema
) => {
  try {
    const account = env.account;
    const chain = await getChain(env.provider);
    const positionsAddress = POSITIONS_NFT_ADDRESS[chain];
    const positionsContract = new Contract(NFT_POSITIONS_CONTRACT_ABI, positionsAddress, env.provider);

    // Convert position_id to u256
    const tokenId = cairo.uint256(params.position_id);

    // Call transfer_from
    positionsContract.connect(account);
    const transferCalldata = positionsContract.populate('transfer_from', [
      env.accountAddress, // from (current owner)
      params.to_address,  // to (new owner)
      tokenId             // token_id (position NFT ID)
    ]);

    // Execute transfer
    const { transaction_hash } = await account.execute([transferCalldata]);

    const receipt = await account.waitForTransaction(transaction_hash);
    if (!receipt.isSuccess()) {
      throw new Error('Transaction confirmed but failed');
    }

    return JSON.stringify({
      status: 'success',
      data: {
        transaction_hash,
        position_id: params.position_id,
        from: env.accountAddress,
        to: params.to_address
      }
    });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error while transferring position'
    });
  }
};

export { transferPositionSchema };
