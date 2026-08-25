const fs = require('fs');
const path = require('path');

const srcFull = path.join(__dirname, '../public/frames/awaken');
const srcHalf = path.join(__dirname, '../public/frames/awaken-half');
const destFull = path.join(__dirname, '../public/frames/scene01');
const destHalf = path.join(__dirname, '../public/frames/scene01-half');

if (!fs.existsSync(destFull)) fs.mkdirSync(destFull, { recursive: true });
if (!fs.existsSync(destHalf)) fs.mkdirSync(destHalf, { recursive: true });

// Copy first 24 frames
for (let i = 0; i < 24; i++) {
  const filename = String(i).padStart(3, '0') + '.webp';
  if (fs.existsSync(path.join(srcFull, filename))) {
    fs.copyFileSync(path.join(srcFull, filename), path.join(destFull, filename));
  }
  if (fs.existsSync(path.join(srcHalf, filename))) {
    fs.copyFileSync(path.join(srcHalf, filename), path.join(destHalf, filename));
  }
}
console.log('Copied 24 frames to scene01 and scene01-half');
