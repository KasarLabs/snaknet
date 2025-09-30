import { z } from 'zod';

export const getPoolInfoSchema = z.object({
    token0: z
    .string()
    .describe('The Starknet contract address of the first token in the pool'),
  token1: z
    .string()
    .describe('The Starknet contract address of the second token in the pool'),
  fee: z
    .string()
    .describe('The fee tier for the pool (e.g., "170141183460469" for 0.05%)'),
  tick_spacing: z
    .number()
    .describe('The tick spacing for the pool (e.g., 10)'),
  extension: z
    .string()
    .describe('The extension contract address (use "0x0" for default pools)')
});

export type PoolKey = z.infer<typeof getPoolInfoSchema>