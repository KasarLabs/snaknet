import { z } from 'zod';

/**
 * Schema for installing Scarb
 */
export const installScarbSchema = z.object({
  version: z
    .string()
    .optional()
    .describe(
      'OPTIONAL: Scarb version to install (e.g., "2.10.0", "2.12.1"). If not specified, installs latest version'
    ),
});

/**
 * Schema for initializing a Scarb project
 */
export const initProjectSchema = z.object({
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
 * Schema for building a Scarb project
 */
export const buildProjectSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
});

export const executableSchema = z.object({
  executableType: z
    .enum(['TARGET', 'FUNCTION'])
    .optional()
    .describe(
      'OPTIONAL: The type of the executable to run: "TARGET" for a target name from Scarb.toml or "FUNCTION" for a function path like "package::module::function"'
    ),
  executableValue: z
    .string()
    .optional()
    .describe(
      'OPTIONAL: The executable value: target name (e.g., "my_executable") or function path (e.g., "my_package::my_module::main")'
    ),
});

/**
 * Schema for executing a program
 */
export const executeProgramSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
  executable: executableSchema
    .optional()
    .describe('OPTIONAL: The executable information (target or function name)'),
  arguments: z
    .string()
    .optional()
    .describe('OPTIONAL: Comma-separated list of arguments'),
  mode: z
    .enum(['standalone', 'bootloader'])
    .optional()
    .default('bootloader')
    .describe('OPTIONAL: The execution mode. Default: bootloader'),
});

/**
 * Schema for proving a program
 */
export const proveProgramSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
  executionId: z.number().describe(''),
});

/**
 * Schema for verifying a program
 */
export const verifyProgramSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
  proofFile: z.string().optional().describe('Path to the proof file to verify'),
});
