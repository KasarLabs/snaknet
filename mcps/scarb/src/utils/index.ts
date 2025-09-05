import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execPromise = promisify(exec);

export interface TomlSection {
  sectionTitle: string;
  valuesObject: Record<string, any>;
}

export interface CairoProgram {
  name: string;
  source_code: string;
}

/**
 * Check if Scarb is installed with PATH refresh
 */
export async function checkScarbInstalled(): Promise<void> {
  try {
    // Ensure we have the updated PATH including ~/.local/bin
    const env = {
      ...process.env,
      PATH: `${process.env.HOME}/.local/bin:${process.env.PATH}`
    };
    
    await execPromise('scarb --version', { env });
  } catch (error) {
    throw new Error('Scarb is not installed or not available in PATH');
  }
}

const execAsync = promisify(exec);
/**
 * Get the Scarb version with PATH refresh
 * @returns The Scarb version
 */
export async function getScarbVersion(): Promise<string> {
  try {
    // Ensure we have the updated PATH including ~/.local/bin
    const env = {
      ...process.env,
      PATH: `${process.env.HOME}/.local/bin:${process.env.PATH}`
    };
    
    const { stdout } = await execAsync('scarb --version', { env });
    return stdout.trim();
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Create a temporary project directory
 */
export async function createTempProjectDir(
  projectName: string
): Promise<string> {
  const tempDir = await fs.mkdtemp(path.join('/tmp', `scarb-${projectName}-`));
  return tempDir;
}

/**
 * Clean up temporary project directory
 */
export async function cleanProject(projectDir: string): Promise<void> {
  try {
    await fs.rm(projectDir, { recursive: true, force: true });
  } catch (error) {
    // Ignore cleanup errors
    console.warn(`Failed to clean project directory: ${error.message}`);
  }
}

/**
 * Write source files to project
 */
export async function writeSourceFiles(
  projectDir: string,
  sourceFiles: Record<string, string>
): Promise<void> {
  const srcDir = path.join(projectDir, 'src');
  await fs.mkdir(srcDir, { recursive: true });

  // Write lib.cairo first
  if (!sourceFiles['lib.cairo']) {
    const libContent = Object.keys(sourceFiles)
      .filter((f) => f.endsWith('.cairo') && f !== 'lib.cairo')
      .map((f) => `mod ${path.basename(f, '.cairo')};`)
      .join('\n');
    await fs.writeFile(path.join(srcDir, 'lib.cairo'), libContent);
  }

  // Write all source files
  for (const [filename, content] of Object.entries(sourceFiles)) {
    const filePath = path.join(srcDir, filename);
    await fs.writeFile(filePath, content);
  }
}

/**
 * Setup TOML configuration
 */
export async function setupToml(
  projectDir: string,
  sections: TomlSection[],
  dependencies?: Record<string, string>
): Promise<void> {
  const tomlPath = path.join(projectDir, 'Scarb.toml');
  let tomlContent = await fs.readFile(tomlPath, 'utf-8');

  // Add dependencies
  if (dependencies) {
    let dependenciesSection = '\n[dependencies]\n';
    for (const [name, version] of Object.entries(dependencies)) {
      dependenciesSection += `${name} = "${version}"\n`;
    }
    tomlContent += dependenciesSection;
  }

  // Add custom sections
  for (const section of sections) {
    let sectionContent = `\n[${section.sectionTitle}]\n`;
    for (const [key, value] of Object.entries(section.valuesObject)) {
      if (typeof value === 'boolean') {
        sectionContent += `${key} = ${value}\n`;
      } else if (typeof value === 'string') {
        sectionContent += `${key} = "${value}"\n`;
      } else {
        sectionContent += `${key} = ${JSON.stringify(value)}\n`;
      }
    }
    tomlContent += sectionContent;
  }

  await fs.writeFile(tomlPath, tomlContent);
}

/**
 * Build a Scarb project
 */
export async function buildProject(projectDir: string): Promise<string> {
  const { stdout, stderr } = await execPromise('scarb build', {
    cwd: projectDir,
  });
  return JSON.stringify({ output: stdout, errors: stderr });
}

/**
 * Execute a Cairo program
 */
export async function executeProgram(
  projectDir: string,
  executableName?: string,
  executableFunction?: string,
  args?: string,
  mode: 'standalone' | 'bootloader' = 'bootloader'
): Promise<string> {
  let command = 'scarb cairo-run';

  if (executableName) {
    command += ` --package ${executableName}`;
  }

  if (executableFunction) {
    command += ` --function ${executableFunction}`;
  }

  if (args) {
    command += ` -- ${args}`;
  }

  if (mode === 'standalone') {
    command += ' --single-file';
  }

  const { stdout, stderr } = await execPromise(command, { cwd: projectDir });
  return JSON.stringify({ output: stdout, errors: stderr });
}

/**
 * Get compiled contract files from target directory
 */
export async function getCompiledFiles(projectDir: string): Promise<{
  sierraFiles: string[];
  casmFiles: string[];
}> {
  const targetDir = path.join(projectDir, 'target', 'dev');

  try {
    const files = await fs.readdir(targetDir);
    const sierraFiles = files
      .filter((f) => f.endsWith('.contract_class.json'))
      .map((f) => path.join(targetDir, f));
    const casmFiles = files
      .filter((f) => f.endsWith('.compiled_contract_class.json'))
      .map((f) => path.join(targetDir, f));

    return { sierraFiles, casmFiles };
  } catch (error) {
    return { sierraFiles: [], casmFiles: [] };
  }
}

/**
 * Copy compiled files to output directory
 */
export async function copyCompiledFiles(
  projectDir: string,
  outputDirectory: string
): Promise<{ sierraFilePaths: string[]; casmFilePaths: string[] }> {
  const { sierraFiles, casmFiles } = await getCompiledFiles(projectDir);

  // Ensure output directory exists
  await fs.mkdir(outputDirectory, { recursive: true });

  const sierraFilePaths: string[] = [];
  const casmFilePaths: string[] = [];

  // Copy sierra files
  for (const sierraFile of sierraFiles) {
    const filename = path.basename(sierraFile);
    const outputPath = path.join(outputDirectory, filename);
    await fs.copyFile(sierraFile, outputPath);
    sierraFilePaths.push(outputPath);
  }

  // Copy casm files
  for (const casmFile of casmFiles) {
    const filename = path.basename(casmFile);
    const outputPath = path.join(outputDirectory, filename);
    await fs.copyFile(casmFile, outputPath);
    casmFilePaths.push(outputPath);
  }

  return { sierraFilePaths, casmFilePaths };
}

/**
 * Format compilation errors for better readability
 */
export function formatCompilationError(error: any): string[] {
  if (typeof error === 'string') {
    return [error];
  }

  if (error.message) {
    return [error.message];
  }

  return ['Unknown compilation error'];
}
