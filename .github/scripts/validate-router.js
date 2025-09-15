#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 Testing main MCP router...\n');

const mcpDir = path.join(process.cwd(), 'mcp');

// Check if mcp directory exists
if (!fs.existsSync(mcpDir)) {
  console.error('❌ Main MCP directory not found');
  process.exit(1);
}

// Check if package.json exists
const packageJsonPath = path.join(mcpDir, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Main MCP package.json not found');
  process.exit(1);
}

try {
  // Install dependencies
  console.log('📦 Installing main MCP dependencies...');
  execSync('npm ci', { 
    cwd: mcpDir, 
    stdio: 'pipe'
  });
  
  // Build
  console.log('🏗️ Building main MCP router...');
  execSync('npm run build', { 
    cwd: mcpDir, 
    stdio: 'pipe'
  });
  
  // Check if build output exists
  const buildOutputPath = path.join(mcpDir, 'build', 'index.js');
  if (!fs.existsSync(buildOutputPath)) {
    console.error('❌ Main MCP router build output missing');
    process.exit(1);
  }
  
  console.log('✅ Main MCP router builds successfully!');
  
} catch (error) {
  console.error('❌ Main MCP router build failed:', error.message);
  process.exit(1);
}