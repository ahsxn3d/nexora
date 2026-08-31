const sharp = require("sharp");
const path = require("path");
const publicDir = "C:/Users/Ahsan/Downloads/nexora-my/public";

// Create circular mask
function circleOverlay(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`
  );
}

async function makeFavicons() {
  const src = path.join(publicDir, "nexora-logo.png");

  // 512x512 circular PNG
  await sharp(src)
    .resize(512, 512, { fit: "cover" })
    .composite([{ input: circleOverlay(512), blend: "dest-in" }])
    .png()
    .toFile(path.join(publicDir, "favicon-512.png"));

  // 192x192
  await sharp(src)
    .resize(192, 192, { fit: "cover" })
    .composite([{ input: circleOverlay(192), blend: "dest-in" }])
    .png()
    .toFile(path.join(publicDir, "favicon-192.png"));

  // 180x180 apple touch
  await sharp(src)
    .resize(180, 180, { fit: "cover" })
    .composite([{ input: circleOverlay(180), blend: "dest-in" }])
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));

  // 32x32
  await sharp(src)
    .resize(32, 32, { fit: "cover" })
    .composite([{ input: circleOverlay(32), blend: "dest-in" }])
    .png()
    .toFile(path.join(publicDir, "favicon-32.png"));

  // 16x16
  await sharp(src)
    .resize(16, 16, { fit: "cover" })
    .composite([{ input: circleOverlay(16), blend: "dest-in" }])
    .png()
    .toFile(path.join(publicDir, "favicon-16.png"));

  console.log("All favicons generated!");
}
makeFavicons().catch(console.error);