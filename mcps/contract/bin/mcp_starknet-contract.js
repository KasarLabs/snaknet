#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get the directory where this script is located
const binDir = __dirname;
const packageDir = path.dirname(binDir);
const indexPath = path.join(packageDir, 'build', 'index.js');

try {
  // Execute the compiled index.js
  execSync(`node "${indexPath}"`, { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start MCP server:', error.message);
  process.exit(1);
}