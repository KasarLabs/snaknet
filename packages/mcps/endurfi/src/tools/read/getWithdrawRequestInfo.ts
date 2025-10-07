import { getWithdrawQueueNFTContract } from '../../lib/utils/contracts.js';
import { GetWithdrawRequestInfoSchema } from '../../schemas/index.js';
import { envRead } from '../../interfaces/index.js';

export const getWithdrawRequestInfo = async (
  env: envRead,
  params: GetWithdrawRequestInfoSchema
) => {
  try {
    const withdrawQueueContract = getWithdrawQueueNFTContract(env.provider);

    // Note: This requires proper withdraw queue NFT ABI
    // Placeholder for now
    return JSON.stringify({
      status: 'failure',
      error:
        'Withdraw request info requires proper withdraw queue NFT ABI. Please check Endur.fi documentation for the exact method to query request status.',
    });

    // TODO: Implement once we have the proper ABI
    // const requestInfo = await withdrawQueueContract.get_request_info(params.withdraw_request_id);
    // return JSON.stringify({
    //   status: 'success',
    //   data: {
    //     withdraw_request_id: params.withdraw_request_id,
    //     status: requestInfo.status,
    //     amount: requestInfo.amount.toString(),
    //     estimated_completion_time: requestInfo.completion_time,
    //     claimable: requestInfo.claimable,
    //   },
    // });
  } catch (error: any) {
    return JSON.stringify({
      status: 'failure',
      error: error.message || 'Unknown error getting withdraw request info',
    });
  }
};
