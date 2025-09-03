import { z } from 'zod';
import { proveProgramSchema } from '../schema/index.js';
import {
  checkScarbInstalled,
  createTempProjectDir,
  initProject,
  writeSourceFiles,
  setupToml,
  cleanProject,
  formatCompilationError
} from '../utils/index.js';
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
    
    // Create temporary project directory
    projectDir = await createTempProjectDir(params.projectName);
    const actualProjectDir = path.join(projectDir, params.projectName);
    
    // Initialize the project
    await initProject(projectDir, params.projectName);
    
    // Write source files
    await writeSourceFiles(actualProjectDir, params.sourceFiles);
    
    // Setup TOML configuration
    await setupToml(actualProjectDir, [], params.dependencies);
    
    // Build the program first
    await execPromise('scarb build', { cwd: actualProjectDir });
    
    // Create prove command
    let command = 'scarb cairo-run --prove';
    
    if (params.executableName) {
      command += ` --package ${params.executableName}`;
    }
    
    if (params.executableFunction) {
      command += ` --function ${params.executableFunction}`;
    }
    
    if (params.arguments) {
      command += ` -- ${params.arguments}`;
    }
    
    // Execute the prove command
    const { stdout, stderr } = await execPromise(command, { cwd: actualProjectDir });
    
    return JSON.stringify({
      status: 'success',
      message: `Program proved successfully`,
      output: stdout,
      errors: stderr,
      projectName: params.projectName,
      executableName: params.executableName,
      executableFunction: params.executableFunction,
      arguments: params.arguments
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
      projectName: params.projectName,
    });
  } finally {
    if (projectDir) {
      await cleanProject(projectDir);
    }
  }
};