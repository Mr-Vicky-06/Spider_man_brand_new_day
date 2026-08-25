const fs = require('fs');
const path = require('path');

function copySequence(sourceName, destName, frameCount) {
  const srcFull = path.join(__dirname, `../public/frames/${sourceName}`);
  const srcHalf = path.join(__dirname, `../public/frames/${sourceName}-half`);
  const destFull = path.join(__dirname, `../public/frames/${destName}`);
  const destHalf = path.join(__dirname, `../public/frames/${destName}-half`);

  if (!fs.existsSync(destFull)) fs.mkdirSync(destFull, { recursive: true });
  if (!fs.existsSync(destHalf)) fs.mkdirSync(destHalf, { recursive: true });

  for (let i = 0; i < frameCount; i++) {
    const filename = String(i).padStart(3, '0') + '.webp';
    if (fs.existsSync(path.join(srcFull, filename))) {
      fs.copyFileSync(path.join(srcFull, filename), path.join(destFull, filename));
    }
    if (fs.existsSync(path.join(srcHalf, filename))) {
      fs.copyFileSync(path.join(srcHalf, filename), path.join(destHalf, filename));
    }
  }
  console.log(`Copied ${frameCount} frames from ${sourceName} to ${destName}`);
}

// Generate scene01 (using awaken frames as a test)
copySequence('awaken', 'scene01', 24);

// Generate scene02 (using monarch frames as a test)
copySequence('monarch', 'scene02', 24);
