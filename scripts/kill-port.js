#!/usr/bin/env node

const { exec } = require('child_process');

function killPort(port) {
  return new Promise((resolve, reject) => {
    exec(`lsof -ti:${port}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }
      
      const pids = stdout.trim().split('\n').filter(pid => pid);
      
      if (pids.length === 0) {
        console.log(`No process found on port ${port}`);
        resolve();
        return;
      }
      
      console.log(`Found ${pids.length} process(es) on port ${port}: ${pids.join(', ')}`);
      
      // Kill all processes
      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, (killError) => {
          if (killError) {
            console.error(`Error killing process ${pid}:`, killError);
          } else {
            console.log(`✅ Killed process ${pid}`);
          }
        });
      });
      
      resolve();
    });
  });
}

// Main function
async function main() {
  const port = process.argv[2] || '3000';
  console.log(`🔍 Checking port ${port}...`);
  
  await killPort(port);
  
  console.log(`✅ Port ${port} is now free!`);
  console.log('🚀 You can now run: npm start');
}

main().catch(console.error);
