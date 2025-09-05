import { z } from 'zod';
import { checkScarbInstalled } from '../utils/index.js';
import { verifyProject } from '../utils/workspace.js';

const verifyProgramSchema = z.object({
  path: z
    .string()
    .optional()
    .describe('Path to the project directory (defaults to current directory)'),
  proofFile: z.string().optional().describe('Path to the proof file to verify'),
});

/**
 * Verify a Cairo program proof
 * @param params The parameters for verification
 * @returns JSON string with verification result
 */
export const verifyProgram = async (
  params: z.infer<typeof verifyProgramSchema>
): Promise<string> => {
  try {
    await checkScarbInstalled();

    const { stdout, stderr } = JSON.parse(
      await verifyProject({
        projectDir: params.path || (process.cwd() as string),
        proofPath: params.proofFile as string,
      })
    );

    return JSON.stringify({
      status: 'success',
      message: 'Program verification completed',
      output: stdout,
      warnings: stderr || undefined,
      projectPath: params.path,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      message: `Verification failed: ${error.message}`,
      error: error.message,
    });
  }
};

export { verifyProgramSchema };
