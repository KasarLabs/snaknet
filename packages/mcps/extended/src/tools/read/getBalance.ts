import { ExtendedApiEnv, ExtendedApiResponse, Balance } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetBalanceSchema } from '../../schemas/index.js';

export const getBalance = async (
  env: ExtendedApiEnv,
  params: GetBalanceSchema
): Promise<ExtendedApiResponse<Balance>> => {
  try {
    const response = await apiGet<{ balance: Balance }>(
      env,
      '/api/v1/user/balance',
      true
    );

    return {
      status: 'success',
      data: response.balance,
    };
  } catch (error: any) {
    console.error('Error getting balance:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get balance',
    };
  }
};
