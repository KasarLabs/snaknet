import { ExtendedApiEnv, ExtendedApiResponse, FeeSchedule } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetFeesSchema } from '../../schemas/index.js';

export const getFees = async (
  env: ExtendedApiEnv,
  params: GetFeesSchema
): Promise<ExtendedApiResponse<FeeSchedule>> => {
  try {
    const response = await apiGet<FeeSchedule>(
      env,
      '/api/v1/user/fees',
      true
    );

    return {
      status: 'success',
      data: response,
    };
  } catch (error: any) {
    console.error('Error getting fees:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get fee schedule',
    };
  }
};
