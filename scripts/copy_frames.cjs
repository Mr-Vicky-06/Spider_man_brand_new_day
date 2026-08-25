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

function copyStaticFrame(sourceName, sourceFrame, destName, destFilename) {
  const srcFull = path.join(__dirname, `../public/frames/${sourceName}`);
  const destFull = path.join(__dirname, `../public/frames/${destName}`);

  if (!fs.existsSync(destFull)) fs.mkdirSync(destFull, { recursive: true });

  const sourceFile = String(sourceFrame).padStart(3, '0') + '.webp';
  
  if (fs.existsSync(path.join(srcFull, sourceFile))) {
    fs.copyFileSync(path.join(srcFull, sourceFile), path.join(destFull, destFilename));
    console.log(`Copied ${sourceFile} from ${sourceName} to ${destName}/${destFilename}`);
  }
}

// Generate scene01 (using awaken frames as a test)
copySequence('awaken', 'scene01', 24);

// Generate scene02 (using monarch frames as a test)
copySequence('monarch', 'scene02', 24);

// Generate scene03 static assets
// Using frame 000 as "unmasked" and frame 023 as "masked" from awaken sequence as placeholders
copyStaticFrame('awaken', 0, 'scene03', 'unmasked.webp');
copyStaticFrame('awaken', 23, 'scene03', 'masked.webp');
