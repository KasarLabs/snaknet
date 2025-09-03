import { z } from 'zod';
import { executeProgramSchema } from '../schema/index.js';
import {
  checkScarbInstalled,
  createTempProjectDir,
  initProject,
  writeSourceFiles,
  setupToml,
  executeProgram as execProgram,
  cleanProject,
  formatCompilationError
} from '../utils/index.js';
import * as path from 'path';

/**
 * Execute a Cairo program
 * @param params The parameters for execution
 * @returns JSON string with execution result
 */
export const executeProgram = async (
  params: z.infer<typeof executeProgramSchema>
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
    
    // Setup TOML configuration (for Cairo programs)
    await setupToml(actualProjectDir, [], params.dependencies);
    
    // Execute the program
    const executionResult = await execProgram(
      actualProjectDir,
      params.executableName,
      params.executableFunction,
      params.arguments,
      params.mode
    );
    
    const parsedResult = JSON.parse(executionResult);
    
    return JSON.stringify({
      status: 'success',
      message: `Program executed successfully`,
      output: parsedResult.output,
      errors: parsedResult.errors,
      projectName: params.projectName,
      executableName: params.executableName,
      executableFunction: params.executableFunction,
      arguments: params.arguments,
      mode: params.mode
    });
    
  } catch (error) {
    const errors = formatCompilationError(error);
    return JSON.stringify({
      status: 'failure',
      errors: errors,
      metadata: {
        error_type: 'execution_error',
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