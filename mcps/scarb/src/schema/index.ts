import { z } from 'zod';

/**
 * Schema for initializing a Scarb project
 */
export const initProjectSchema = z.object({
  projectName: z.string().describe('Name of the project to initialize'),
  path: z
    .string()
    .optional()
    .describe(
      'Path where to initialize the project (defaults to current directory)'
    ),
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
    .enum(['FILE', 'FUNCTION'])
    .describe(
      'The type of the executable to run: "FILE" for a specific file or "FUNCTION" for a specific function'
    ),
  executableValue: z
    .string()
    .describe(
      'The name of the executable to run (ex: ...)'
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
    .describe('OPTIONAL: The executable information (filename or function name)'),
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
  proofFile: z.string().optional().describe('Path to the proof file to verify')
});
