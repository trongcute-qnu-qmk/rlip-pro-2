import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

async function check() {
  console.log("Starting server...");
  const server = spawn('npm', ['run', 'preview']);
  
  // Wait a bit for server to start
  await new Promise(r => setTimeout(r, 2000));

  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('BROWSER CONSOLE:', msg.text());
  });
  
  page.on('pageerror', err => {
    console.error('BROWSER ERROR:', err.message);
  });

  try {
    console.log("Navigating...");
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
    console.log("Navigation complete.");
  } catch(e) {
    console.log("Goto error:", e);
  }

  await browser.close();
  server.kill();
}

check();
