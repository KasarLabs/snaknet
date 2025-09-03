import { z } from 'zod';
import { compileContractSchema } from '../schema/index.js';
import {
  checkScarbInstalled,
  createTempProjectDir,
  initProject,
  writeSourceFiles,
  setupToml,
  buildProject,
  copyCompiledFiles,
  cleanProject,
  formatCompilationError
} from '../utils/index.js';
import * as path from 'path';
import { 
  setupScarbProject,
  setupSrc
} from '../utils/common.js'

/**
 * Compile a contract using the file path approach
 * @param params The parameters for compilation
 * @returns JSON string with compilation result
 */
export const compileContract = async (
  params: z.infer<typeof compileContractSchema>
): Promise<string> => {
  let projectDir = '';
  
  try {
    await checkScarbInstalled();
    
    // // Create temporary project directory
    // projectDir = await createTempProjectDir(params.projectName);
    // const actualProjectDir = path.join(projectDir, params.projectName);
    projectDir = await setupScarbProject({
      projectName: params.projectName,
    });
    // // Initialize the project
    // await initProject(projectDir, params.projectName);
    
    // Write source files
    // await writeSourceFiles(actualProjectDir, params.sourceFiles);
    
    // Setup TOML configuration
    const tomlSections = (() => {
      switch (params.projectType) {
        case 'cairo_program':
          return [];
        case 'contract':
          return [
            {
              workingDir: projectDir,
              sectionTitle: 'target.starknet-contract',
              valuesObject: {
                sierra: true,
                casm: true,
              },
            },
          ];
      }
    })();

    await setupToml(projectDir, tomlSections, params.dependencies);
    
    // extract program from project.File?
    await setupSrc(projectDir, projectData.programs);
    
    // Build the project
    const buildResult =  await buildProject(projectDir);
    const parsedBuildResult = JSON.parse(buildResult);

    // Copy compiled files to output directory if it's a contract
    let sierraFilePaths: string[] = [];
    let casmFilePaths: string[] = [];

    if (params.projectType === 'contract') {
      const contractFiles = await getGeneratedContractFiles(projectDir);

      const programNames: string[] = [];
      const sierraFiles: string[] = [];
      const casmFiles: string[] = [];

      for (let i = 0; i < contractFiles.sierraFiles.length; i++) {
        const name = await extractModuleFromArtifact(
          contractFiles.artifactFile,
          i
        );
        programNames.push(name + '.cairo');
        sierraFiles.push(await readFile(contractFiles.sierraFiles[i], 'utf-8'));
        casmFiles.push(await readFile(contractFiles.casmFiles[i], 'utf-8'));
      }

      const compiledFiles = await copyCompiledFiles(projectDir, params.outputDirectory);
      console.log(compiledFiles);
    }

    return JSON.stringify({
      status: 'success',
      message: `Contract compiled successfully`,
      output: parsedBuildResult.output,
      warnings: parsedBuildResult.errors,
      outputDirectory: params.outputDirectory
    });
    
  } catch (error) {
    const errors = formatCompilationError(error);
    return JSON.stringify({
      status: 'failure',
      errors: errors,
      metadata: {
        error_type: 'compilation_error',
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