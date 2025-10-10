import { z } from 'zod';
import {
  checkScarbInstalled,
  executeProgram as execProgram,
} from '../lib/utils/index.js';
import { executeProject } from '../lib/utils/workspace.js';
import { executeProgramSchema } from '../schemas/index.js';

/**
 * Execute a Cairo program
 * @param params The parameters for execution
 * @returns JSON string with execution result
 */
export const executeProgram = async (
  params: z.infer<typeof executeProgramSchema>
) => {
  try {
    await checkScarbInstalled();

    let executableName = undefined;
    let executableFunction = undefined;
    if (
      params.executable?.executableType === 'TARGET' &&
      params.executable?.executableValue
    ) {
      executableName = params.executable.executableValue;
    }
    if (
      params.executable?.executableType === 'FUNCTION' &&
      params.executable?.executableValue
    ) {
      executableFunction = params.executable.executableValue;
    }

    const result = await executeProject(
      params.path || (process.cwd() as string),
      params.mode || undefined,
      executableName,
      executableFunction,
      params.arguments || undefined
    );

    return {
      status: 'success',
      message: 'Program executed successfully',
      result,
      projectPath: params.path,
    };
  } catch (error) {
    return {
      status: 'failure',
      message: `Execution failed: ${error.message}`,
      error: error.message,
    };
  }
};

export { executeProgramSchema };
