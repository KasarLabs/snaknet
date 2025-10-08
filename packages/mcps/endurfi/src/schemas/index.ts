import { z } from 'zod';

// Stake STRK to receive xSTRK
export const stakeStrkSchema = z.object({
  amount: z
    .string()
    .describe('The amount of STRK to stake (in token decimals, e.g., "1000000000000000000" for 1 STRK)'),
});

export type StakeStrkSchema = z.infer<typeof stakeStrkSchema>;

// Unstake xSTRK via withdraw queue (1-2 days)
export const unstakeXstrkQueueSchema = z.object({
  xstrk_amount: z
    .string()
    .describe('The amount of xSTRK to unstake (in token decimals)'),
});

export type UnstakeXstrkQueueSchema = z.infer<typeof unstakeXstrkQueueSchema>;

// Claim unstake request after waiting period
export const claimUnstakeRequestSchema = z.object({
  withdraw_request_id: z
    .string()
    .describe('The NFT ID of the withdraw request to claim'),
});

export type ClaimUnstakeRequestSchema = z.infer<typeof claimUnstakeRequestSchema>;

// Preview stake - how much xSTRK for X STRK
export const previewStakeSchema = z.object({
  strk_amount: z
    .string()
    .describe('The amount of STRK to preview staking (in token decimals)'),
});

export type PreviewStakeSchema = z.infer<typeof previewStakeSchema>;

// Preview unstake - how much STRK for X xSTRK
export const previewUnstakeSchema = z.object({
  xstrk_amount: z
    .string()
    .describe('The amount of xSTRK to preview unstaking (in token decimals)'),
});

export type PreviewUnstakeSchema = z.infer<typeof previewUnstakeSchema>;

// Get user xSTRK balance
export const getUserXstrkBalanceSchema = z.object({
  user_address: z
    .string()
    .optional()
    .describe('The user address to check balance for (optional, defaults to connected account)'),
});

export type GetUserXstrkBalanceSchema = z.infer<typeof getUserXstrkBalanceSchema>;

// Get total STRK staked on Endur.fi
export const getTotalStakedStrkSchema = z.object({});

export type GetTotalStakedStrkSchema = z.infer<typeof getTotalStakedStrkSchema>;

// Get withdraw request info
export const getWithdrawRequestInfoSchema = z.object({
  withdraw_request_id: z
    .string()
    .describe('The NFT ID of the withdraw request to query'),
});

export type GetWithdrawRequestInfoSchema = z.infer<typeof getWithdrawRequestInfoSchema>;
