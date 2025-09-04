import { z } from 'zod';
import {
  checkScarbInstalled,
  executeProgram as execProgram,
} from '../utils/index.js';
import { executeProject } from '@/utils/workspace.js';

const executeProgramSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
  executableFunction: z
    .string()
    .optional()
    .describe('The name of the function to run'),
  executableName: z
    .string()
    .optional()
    .describe('The name of the function to run'),
  arguments: z
    .string()
    .optional()
    .describe('Comma-separated list of arguments'),
  mode: z
    .enum(['standalone', 'bootloader'])
    .optional()
    .default('bootloader')
    .describe('The execution mode'),
});

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

    const result = await executeProject(
      params.path || (process.cwd() as string),
      params.mode || undefined,
      params.executableName || undefined,
      params.executableFunction || undefined,
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
