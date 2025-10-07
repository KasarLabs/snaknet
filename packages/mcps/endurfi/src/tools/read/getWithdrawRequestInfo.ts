import { getWithdrawQueueNFTContract } from '../../lib/utils/contracts.js';
import { GetWithdrawRequestInfoSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';

export const getWithdrawRequestInfo = async (
  env: envRead,
  params: GetWithdrawRequestInfoSchema
) => {
  try {
    const withdrawQueueContract = getWithdrawQueueNFTContract(env.provider);

    // Convert request_id string to u128
    const requestId = BigInt(params.withdraw_request_id);

    // Get withdraw request information
    const requestInfo = await withdrawQueueContract.get_request_info(requestId);

    // Parse the WithdrawRequest struct
    const assets = BigInt(requestInfo.assets.low) + (BigInt(requestInfo.assets.high) << 128n);
    const shares = BigInt(requestInfo.shares.low) + (BigInt(requestInfo.shares.high) << 128n);
    const isClaimed = requestInfo.isClaimed;
    const timestamp = BigInt(requestInfo.timestamp);
    const claimTime = BigInt(requestInfo.claimTime);

    // Calculate if claimable (current time > claimTime)
    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    const isClaimable = !isClaimed && currentTime >= claimTime;

    return {
      status: 'success',
      data: {
        withdraw_request_id: params.withdraw_request_id,
        assets_amount: assets.toString(),
        shares_amount: shares.toString(),
        is_claimed: isClaimed,
        timestamp: timestamp.toString(),
        claim_time: claimTime.toString(),
        is_claimable: isClaimable,
        status: isClaimed ? 'claimed' : isClaimable ? 'ready' : 'pending',
      },
    };
  } catch (error: any) {
    return {
      status: 'failure',
      error: error.message || 'Unknown error getting withdraw request info',
    };
  }
};
