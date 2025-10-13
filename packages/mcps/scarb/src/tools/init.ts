import { z } from 'zod';
import { checkScarbInstalled } from '../lib/utils/index.js';
import { initProject as initScarbProject } from '../lib/utils/workspace.js';
import { initProjectSchema } from '../schemas/index.js';

// initProjectSchema is now imported from schemas/index.js

/**
 * Initialize a new Scarb project
 * @param params The parameters for project initialization
 * @returns JSON string with initialization result
 */
export const initProject = async (
  params: z.infer<typeof initProjectSchema>
) => {
  try {
    await checkScarbInstalled();
    const projectDir = params.path || process.cwd();

    await initScarbProject({ name: params.projectName, projectDir });

    return {
      status: 'success',
      message: `Project '${params.projectName}' initialized successfully`,
      projectName: params.projectName,
      path: projectDir,
    };
  } catch (error) {
    return {
      status: 'failure',
      message: `Failed to initialize project: ${error.message}`,
      error: error.message,
    };
  }
};

// initProjectSchema is now exported from schemas/index.js
