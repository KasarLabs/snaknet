import { ExtendedApiEnv, ExtendedApiResponse, Order } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetOpenOrdersSchema } from '../../schemas/index.js';

export const getOpenOrders = async (
  env: ExtendedApiEnv,
  params: GetOpenOrdersSchema
): Promise<ExtendedApiResponse<Order[]>> => {
  try {
    const response = await apiGet<{ orders: Order[] }>(
      env,
      '/api/v1/user/orders/open',
      true
    );

    return {
      status: 'success',
      data: response.orders,
    };
  } catch (error: any) {
    console.error('Error getting open orders:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get open orders',
    };
  }
};
