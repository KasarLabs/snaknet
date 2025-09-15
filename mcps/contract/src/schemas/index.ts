import { z } from 'zod';

/**
 * Schema for declaring a contract using file path approach
 */
export const declareContractSchema = z.object({
  sierraFilePath: z.string().describe('Path to the sierra JSON file'),
  casmFilePath: z.string().describe('Path to the casm JSON file'),
});

/**
 * Schema for deploying a contract using file path approach
 */
export const deployContractSchema = z.object({
  sierraFilePath: z.string().describe('Path to the sierra JSON file'),
  casmFilePath: z.string().describe('Path to the casm JSON file'),
  classHash: z
    .string()
    .describe('Class hash of the declared contract to deploy'),
  constructorArgs: z
    .array(z.string())
    .optional()
    .describe('OPTIONAL: Arguments for the contract constructor'),
});

/**
 * Schema for getting constructor parameters
 */
export const getConstructorParamsSchema = z.object({
  sierraFilePath: z.string().describe('Path to the sierra JSON file'),
  casmFilePath: z.string().describe('Path to the casm JSON file'),
  classHash: z.string().describe('Class hash of the declared contract'),
  constructorArgs: z
    .array(z.string())
    .optional()
    .describe(
      'OPTIONAL: Arguments for the contract constructor that need to be ordered'
    ),
});