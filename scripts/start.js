#!/usr/bin/env node

const { spawn } = require('child_process');
const net = require('net');

// Function to check if port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => {
        resolve(true);
      });
      server.close();
    });
    
    server.on('error', () => {
      resolve(false);
    });
  });
}

// Function to find available port
async function findAvailablePort(startPort = 3000) {
  for (let port = startPort; port <= startPort + 100; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error('No available port found');
}

// Main function
async function startApp() {
  try {
    const port = await findAvailablePort(3000);
    console.log(`🚀 Starting app on port ${port}...`);
    
    const child = spawn('react-scripts', ['start'], {
      env: { ...process.env, PORT: port.toString() },
      stdio: 'inherit',
      shell: true
    });
    
    child.on('error', (error) => {
      console.error('Error starting app:', error);
      process.exit(1);
    });
    
    child.on('exit', (code) => {
      process.exit(code);
    });
    
  } catch (error) {
    console.error('Error finding available port:', error);
    process.exit(1);
  }
}

startApp();
