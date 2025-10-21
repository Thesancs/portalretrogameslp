const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const sourceManifests = [
  { from: path.join(projectRoot, '.next', 'build-manifest.json'), to: 'build-manifest.json' },
  { from: path.join(projectRoot, '.next', 'app-build-manifest.json'), to: 'app-build-manifest.json' },
  { from: path.join(projectRoot, '.next', 'server', 'pages-manifest.json'), to: 'pages-manifest.json' },
  { from: path.join(projectRoot, '.next', 'server', 'next-font-manifest.json'), to: 'next-font-manifest.json' },
];
const targetDir = path.join(projectRoot, '.next', 'server', 'pages', '_app');

function copyManifest() {
  fs.mkdirSync(targetDir, { recursive: true });

  sourceManifests.forEach(({ from, to }) => {
    if (!fs.existsSync(from)) {
      console.warn(`[postbuild] Manifest not found at ${from}`);
      return;
    }

    const targetPath = path.join(targetDir, to);
    fs.copyFileSync(from, targetPath);
    console.log(`[postbuild] Copied ${path.basename(from)} to ${targetPath}`);
  });
}

copyManifest();
