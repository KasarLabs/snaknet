import { z } from 'zod';
import {
  checkScarbInstalled,
  buildProject as buildScarbProject,
} from '../utils/index.js';

const buildProjectSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
});

/**
 * Build a Scarb project
 * @param params The parameters for building the project
 * @returns JSON string with build result
 */
export const buildProject = async (
  params: z.infer<typeof buildProjectSchema>
): Promise<string> => {
  try {
    await checkScarbInstalled();

    const projectDir = params.path || process.cwd();
    const result = await buildScarbProject(projectDir);

    return JSON.stringify({
      status: 'success',
      message: 'Project built successfully',
      ...JSON.parse(result),
      buildPath: projectDir,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      message: `Build failed: ${error.message}`,
      error: error.message,
    });
  }
};

export { buildProjectSchema };
