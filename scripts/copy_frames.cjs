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

// Generate scene01
copySequence('awaken', 'scene01', 24);

// Generate scene02
copySequence('monarch', 'scene02', 24);

// Generate scene03
copyStaticFrame('awaken', 0, 'scene03', 'unmasked.webp');
copyStaticFrame('awaken', 23, 'scene03', 'masked.webp');

// Generate scene04
copyStaticFrame('awaken', 12, 'scene04', 'sense-bg.webp');

// Generate scene05
const scene05Full = path.join(__dirname, `../public/frames/scene05`);
const scene05Half = path.join(__dirname, `../public/frames/scene05-half`);
if (!fs.existsSync(scene05Full)) fs.mkdirSync(scene05Full, { recursive: true });
if (!fs.existsSync(scene05Half)) fs.mkdirSync(scene05Half, { recursive: true });

for (let i = 0; i < 48; i++) {
  const destFilename = String(i).padStart(3, '0') + '.webp';
  const sourceName = i < 24 ? 'awaken' : 'monarch';
  const sourceFrame = String(i % 24).padStart(3, '0') + '.webp';
  
  const srcFull = path.join(__dirname, `../public/frames/${sourceName}`);
  const srcHalf = path.join(__dirname, `../public/frames/${sourceName}-half`);

  if (fs.existsSync(path.join(srcFull, sourceFrame))) {
    fs.copyFileSync(path.join(srcFull, sourceFrame), path.join(scene05Full, destFilename));
  }
  if (fs.existsSync(path.join(srcHalf, sourceFrame))) {
    fs.copyFileSync(path.join(srcHalf, sourceFrame), path.join(scene05Half, destFilename));
  }
}

// Generate 3 static keyframes for reduced-motion in Scene05
copyStaticFrame('awaken', 0, 'scene05', 'keyframe-1.webp');
copyStaticFrame('awaken', 12, 'scene05', 'keyframe-2.webp');
copyStaticFrame('monarch', 23, 'scene05', 'keyframe-3.webp');

const dragonX = [];
for (let i = 0; i < 48; i++) {
  const t = i / 47;
  const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  dragonX.push(eased);
}
fs.writeFileSync(path.join(scene05Full, 'metadata.json'), JSON.stringify({ dragonX }, null, 2));

// Generate scene06 (Brand New Day) static hero background
copyStaticFrame('awaken', 23, 'scene06', 'hero-bg.webp');
