import { ExtendedApiEnv, ExtendedApiResponse } from '../../lib/types/index.js';
import { apiDelete } from '../../lib/utils/api.js';
import { CancelOrderSchema } from '../../schemas/index.js';

interface CancelOrderResponse {
  success: boolean;
  message: string;
}

export const cancelOrder = async (
  env: ExtendedApiEnv,
  params: CancelOrderSchema
): Promise<ExtendedApiResponse<CancelOrderResponse>> => {
  try {
    const response = await apiDelete<CancelOrderResponse>(
      env,
      `/api/v1/user/orders/${params.order_id}`
    );

    return {
      status: 'success',
      data: response,
    };
  } catch (error: any) {
    console.error('Error canceling order:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to cancel order',
    };
  }
};
