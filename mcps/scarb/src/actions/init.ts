import { z } from 'zod';
import { checkScarbInstalled } from '../utils/index.js';
import { initProject as initScarbProject } from '../utils/workspace.js';

const initProjectSchema = z.object({
  projectName: z.string().describe('Name of the project to initialize'),
  projectType: z
    .enum(['lib', 'bin'])
    .default('lib')
    .describe('Project type (lib or bin)'),
  path: z
    .string()
    .optional()
    .describe(
      'Path where to initialize the project (defaults to current directory)'
    ),
  vcs: z
    .enum(['git', 'none'])
    .default('git')
    .describe('Version control system to use'),
});

/**
 * Initialize a new Scarb project
 * @param params The parameters for project initialization
 * @returns JSON string with initialization result
 */
export const initProject = async (
  params: z.infer<typeof initProjectSchema>
): Promise<string> => {
  try {
    await checkScarbInstalled();
    const projectDir = params.path || process.cwd();

    await initScarbProject({ name: params.projectName, projectDir });

    return JSON.stringify({
      status: 'success',
      message: `Project '${params.projectName}' initialized successfully`,
      projectName: params.projectName,
      path: projectDir,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      message: `Failed to initialize project: ${error.message}`,
      error: error.message,
    });
  }
};

export { initProjectSchema };
