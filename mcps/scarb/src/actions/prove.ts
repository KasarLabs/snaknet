import { z } from 'zod';
import { proveProgramSchema } from '../schema/index.js';
import {
  checkScarbInstalled,
  cleanProject,
  formatCompilationError,
} from '../utils/index.js';
import { proveProject } from '../utils/workspace.js';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

/**
 * Prove a Cairo program using Stone prover
 * @param params The parameters for proving
 * @returns JSON string with proving result
 */
export const proveProgram = async (
  params: z.infer<typeof proveProgramSchema>
): Promise<string> => {
  let projectDir = '';

  try {
    await checkScarbInstalled();

    const result = JSON.parse(
      await proveProject({
        projectDir: params.path || process.cwd(),
        executionId: params.executionId.toString(),
      })
    );

    const fullPath = path.join(projectDir, result.proofPath);

    return JSON.stringify({
      status: 'success',
      message: 'Program proved successfully',
      proofPath: fullPath,
      output: result.stdout,
      error: result.stderr,
      projectPath: projectDir,
    });
  } catch (error) {
    const errors = formatCompilationError(error);
    return JSON.stringify({
      status: 'failure',
      errors: errors,
      metadata: {
        error_type: 'proving_error',
        needs_exact_forwarding: true,
      },
    });
  } finally {
    if (projectDir) {
      await cleanProject(projectDir);
    }
  }
};
