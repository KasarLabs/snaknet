import { ExtendedApiEnv, ExtendedApiResponse, Order } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetOrderByIdSchema } from '../../schemas/index.js';

export const getOrderById = async (
  env: ExtendedApiEnv,
  params: GetOrderByIdSchema
): Promise<ExtendedApiResponse<Order>> => {
  try {
    const response = await apiGet<{ order: Order }>(
      env,
      `/api/v1/user/orders/${params.order_id}`,
      true
    );

    return {
      status: 'success',
      data: response.order,
    };
  } catch (error: any) {
    console.error('Error getting order by ID:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get order',
    };
  }
};
