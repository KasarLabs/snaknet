import { z } from 'zod';
import {
  checkScarbInstalled,
  executeProgram as execProgram,
} from '../utils/index.js';
import { executeProject } from '../utils/workspace.js';
import { executeProgramSchema } from '../schema/index.js';

/**
 * Execute a Cairo program
 * @param params The parameters for execution
 * @returns JSON string with execution result
 */
export const executeProgram = async (
  params: z.infer<typeof executeProgramSchema>
): Promise<string> => {
  try {
    await checkScarbInstalled();

    let executableFile = undefined
    let executableFunction = undefined
    if (params.executable?.executableType === 'FILE') executableFile = params.executable?.executableValue;
    if (params.executable?.executableType === 'FUNCTION') executableFunction = params.executable?.executableValue

    const result = await executeProject(
      params.path || (process.cwd() as string),
      params.mode || undefined,
      executableFile,
      executableFunction,
      params.arguments || undefined
    );

    return JSON.stringify({
      status: 'success',
      message: 'Program executed successfully',
      ...JSON.parse(result),
      projectPath: params.path,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      message: `Execution failed: ${error.message}`,
      error: error.message,
    });
  }
};

export { executeProgramSchema };
