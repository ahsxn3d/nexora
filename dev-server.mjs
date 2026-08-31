import { spawn } from 'child_process';

function run() {
  const child = spawn('node', ['./node_modules/next/dist/bin/next', 'dev', '-p', '3002'], {
    stdio: ['ignore', 'inherit', 'inherit'],
    cwd: process.cwd(),
    env: { ...process.env, CI: '1', NODE_ENV: 'development' }
  });

  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`Next.js process exited with code ${code}. Restarting in 2s...`);
      setTimeout(run, 2000);
    }
  });
}

run();