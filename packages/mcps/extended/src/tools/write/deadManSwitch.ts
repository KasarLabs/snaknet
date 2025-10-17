import { ExtendedApiEnv, ExtendedApiResponse } from '../../lib/types/index.js';
import { apiPost } from '../../lib/utils/api.js';
import { DeadManSwitchSchema } from '../../schemas/index.js';

export const deadManSwitch = async (
  env: ExtendedApiEnv,
  params: DeadManSwitchSchema
): Promise<ExtendedApiResponse<{ message: string }>> => {
  try {
    await apiPost<{ status: string }>(
      env,
      `/api/v1/user/deadmanswitch?countdownTime=${params.countdown_time}`,
      {}
    );

    const message = params.countdown_time === 0
      ? 'Dead man switch disabled'
      : `Dead man switch set to ${params.countdown_time} seconds`;

    return {
      status: 'success',
      data: { message },
    };
  } catch (error: any) {
    console.error('Error setting dead man switch:', error);
    return {
      status: 'failure',
      error: error.message || 'Failed to set dead man switch',
    };
  }
};
