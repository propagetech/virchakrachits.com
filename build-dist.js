#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const distDir = path.join(__dirname, 'dist');

// Files and folders to copy (website files only)
const filesToCopy = [
  '*.html',
  '_headers',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'favicon.ico',
  'favicon.svg',
  'favicon-96x96.png',
  'favicon-192x192.png',
  'favicon-512x512.png',
  'apple-touch-icon.png',
  'web-app-manifest-192x192.png',
  'web-app-manifest-512x512.png'
];

const foldersToCopy = ['css', 'js', 'images', 'imgs', 'fonts'];

// Clean dist folder
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy files matching patterns
filesToCopy.forEach(pattern => {
  if (pattern.includes('*')) {
    const regex = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
    fs.readdirSync(srcDir).forEach(file => {
      if (regex.test(file) && fs.statSync(path.join(srcDir, file)).isFile()) {
        fs.copyFileSync(path.join(srcDir, file), path.join(distDir, file));
        console.log(`✓ Copied: ${file}`);
      }
    });
  } else {
    const src = path.join(srcDir, pattern);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(distDir, pattern));
      console.log(`✓ Copied: ${pattern}`);
    }
  }
});

// Copy folders
foldersToCopy.forEach(folder => {
  const src = path.join(srcDir, folder);
  const dest = path.join(distDir, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✓ Copied folder: ${folder}/`);
  }
});

console.log(`\n✅ Build complete! Website files copied to dist/`);
