import { ExtendedApiEnv, ExtendedApiResponse } from '../../lib/types/index.js';
import { apiDelete } from '../../lib/utils/api.js';
import { CancelOrderByExternalIdSchema } from '../../schemas/index.js';

export const cancelOrderByExternalId = async (
  env: ExtendedApiEnv,
  params: CancelOrderByExternalIdSchema
): Promise<ExtendedApiResponse<{ message: string }>> => {
  try {
    await apiDelete<{ status: string }>(
      env,
      `/api/v1/user/order?externalId=${params.external_id}`
    );

    return {
      status: 'success',
      data: { message: `Order with external ID ${params.external_id} canceled successfully` },
    };
  } catch (error: any) {
    console.error('Error canceling order by external ID:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to cancel order by external ID',
    };
  }
};
