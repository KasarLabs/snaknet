import { z } from 'zod';

/**
 * Schema for compiling a contract/program with file path approach
 */
export const compileContractSchema = z.object({
  sourceFiles: z.record(z.string()).describe('Map of filename to source code for the project'),
  outputDirectory: z.string().describe('Directory where compiled artifacts (sierra/casm files) will be written'),
  projectName: z.string().describe('Name of the project being compiled'),
  dependencies: z.record(z.string()).optional().describe('OPTIONAL: Project dependencies as name->version mapping'),
  projectType: z.enum(['contract', 'cairo_program']).default('contract').describe('OPTIONAL: Type of project to compile')
});

/**
 * Schema for executing a program with file path approach
 */
export const executeProgramSchema = z.object({
  sourceFiles: z.record(z.string()).describe('Map of filename to source code for the project'),
  projectName: z.string().describe('Name of the project to execute'),
  executableName: z.string().optional().describe('OPTIONAL: The name of the executable to run'),
  executableFunction: z.string().optional().describe('OPTIONAL: The name of the function to run'),
  arguments: z.string().optional().describe('OPTIONAL: Comma-separated list of integers corresponding to the function arguments'),
  mode: z.enum(['standalone', 'bootloader']).optional().default('bootloader').describe('OPTIONAL: The target to compile for'),
  dependencies: z.record(z.string()).optional().describe('OPTIONAL: Project dependencies as name->version mapping')
});

/**
 * Schema for proving a program with file path approach
 */
export const proveProgramSchema = z.object({
  sourceFiles: z.record(z.string()).describe('Map of filename to source code for the project'),
  projectName: z.string().describe('Name of the project to prove'),
  executableName: z.string().optional().describe('OPTIONAL: The name of the executable to run'),
  executableFunction: z.string().optional().describe('OPTIONAL: The name of the function to run'),
  arguments: z.string().optional().describe('OPTIONAL: Comma-separated list of integers corresponding to the function arguments'),
  dependencies: z.record(z.string()).optional().describe('OPTIONAL: Project dependencies as name->version mapping')
});

/**
 * Schema for verifying a program with file path approach
 */
export const verifyProgramSchema = z.object({
  sourceFiles: z.record(z.string()).describe('Map of filename to source code for the project'),
  projectName: z.string().describe('Name of the project to verify'),
  dependencies: z.record(z.string()).optional().describe('OPTIONAL: Project dependencies as name->version mapping')
});