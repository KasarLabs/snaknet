import { ExtendedApiEnv, ExtendedApiResponse, LeverageSetting } from '../../lib/types/index.js';
import { apiGet } from '../../lib/utils/api.js';
import { GetLeverageSchema } from '../../schemas/index.js';

export const getLeverage = async (
  env: ExtendedApiEnv,
  params: GetLeverageSchema
): Promise<ExtendedApiResponse<LeverageSetting[]>> => {
  try {
    const response = await apiGet<{ leverage_settings: LeverageSetting[] }>(
      env,
      '/api/v1/user/leverage',
      true
    );

    return {
      status: 'success',
      data: response.leverage_settings,
    };
  } catch (error: any) {
    console.error('Error getting leverage:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to get leverage settings',
    };
  }
};
