#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building all MCPs...\n');

const mcpsDir = path.join(process.cwd(), 'mcps');

// Get all MCP directories
let mcpDirs = [];
try {
  mcpDirs = fs.readdirSync(mcpsDir)
    .filter(name => {
      const fullPath = path.join(mcpsDir, name);
      return fs.statSync(fullPath).isDirectory();
    });
} catch (error) {
  console.error('❌ Error reading mcps directory:', error.message);
  process.exit(1);
}

let hasErrors = false;

for (const mcpName of mcpDirs) {
  console.log(`\n🔧 Building ${mcpName}...`);
  
  const mcpDir = path.join(mcpsDir, mcpName);
  
  // Check if package.json exists
  const packageJsonPath = path.join(mcpDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ No package.json in ${mcpName}`);
    hasErrors = true;
    continue;
  }
  
  try {
    // Install dependencies
    console.log(`📦 Installing dependencies for ${mcpName}...`);
    execSync('nm ci', { 
      cwd: mcpDir, 
      stdio: 'pipe'
    });
    
    // Build
    console.log(`🏗️ Building ${mcpName}...`);
    execSync('npm run build', { 
      cwd: mcpDir, 
      stdio: 'pipe'
    });
    
    // Check if build output exists
    const buildOutputPath = path.join(mcpDir, 'build', 'index.js');
    if (!fs.existsSync(buildOutputPath)) {
      console.error(`❌ Build output missing for ${mcpName}`);
      hasErrors = true;
      continue;
    }
    
    console.log(`✅ ${mcpName} built successfully`);
    
  } catch (error) {
    console.error(`❌ Failed to build ${mcpName}:`, error.message);
    hasErrors = true;
  }
}

if (hasErrors) {
  console.error('\n❌ Some MCPs failed to build!');
  process.exit(1);
} else {
  console.log('\n✅ All MCPs built successfully!');
}