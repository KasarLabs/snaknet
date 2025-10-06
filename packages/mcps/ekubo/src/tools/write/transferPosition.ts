import { cairo } from 'starknet';
import { getContract } from '../../lib/utils/contracts.js';
import { TransferPositionSchema } from '../../schemas/index.js';

export const transferPosition = async (
  env: any,
  params: TransferPositionSchema
) => {
  try {
    const account = env.account;
    const NFTContract = await getContract(env.provider, 'positionsNFT');

    const tokenId = cairo.uint256(params.position_id);

    NFTContract.connect(account);
    const transferCalldata = NFTContract.populate('transfer_from', [
      env.accountAddress, // from (current owner)
      params.to_address,  // to (new owner)
      tokenId             // token_id (position NFT ID)
    ]);

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
