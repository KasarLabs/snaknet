import { z } from 'zod';
import { getScarbVersion, checkScarbInstalled } from '../utils/index.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Install Scarb (or check if it's already installed)
 * @param params Installation parameters
 * @returns JSON string with installation result
 */
export const installScarb = async (): Promise<string> => {
  try {
    const version = await getScarbVersion();
    if (version !== 'unknown') {
      return JSON.stringify({
        status: 'success',
        message: `Scarb is already installed (version: ${version})`,
      });
    }

    const { stdout, stderr } = await execAsync(
      "curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh -s -- -v 2.10.0"
    );

    await checkScarbInstalled();

    return JSON.stringify({
      status: 'success',
      message: `Scarb installed successfully (version: '2.10.0')`,
      output: stdout,
      errors: stderr || undefined,
    });
  } catch (error) {
    return JSON.stringify({
      status: 'failure',
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to check or install Scarb'
    });
  }
};