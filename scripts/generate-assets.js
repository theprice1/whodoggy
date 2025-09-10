const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const logoSvg = await fs.readFile('assets/raw/svg/logo.svg');

  // Generate Expo/React Native icons
  const sizes = [
    { size: 1024, name: 'icon.png', path: 'apps/mobile/assets/' },
    { size: 512, name: 'adaptive-icon.png', path: 'apps/mobile/assets/' },
  ];

  // Generate Android icons
  const androidSizes = [
    { size: 48, density: 'mdpi' },
    { size: 72, density: 'hdpi' },
    { size: 96, density: 'xhdpi' },
    { size: 144, density: 'xxhdpi' },
    { size: 192, density: 'xxxhdpi' },
  ];

  console.log('🎨 Generating WhoDoggy icons...');

  // Generate main icons
  for (const config of sizes) {
    await sharp(logoSvg)
      .resize(config.size, config.size)
      .png()
      .toFile(path.join(config.path, config.name));
    console.log(`✅ Generated ${config.name}`);
  }

  // Generate Android icons
  for (const config of androidSizes) {
    const outputPath = `apps/mobile/android/app/src/main/res/mipmap-${config.density}/`;

    await sharp(logoSvg)
      .resize(config.size, config.size)
      .png()
      .toFile(path.join(outputPath, 'ic_launcher.png'));

    await sharp(logoSvg)
      .resize(config.size, config.size)
      .png()
      .toFile(path.join(outputPath, 'ic_launcher_round.png'));

    console.log(`✅ Generated Android ${config.density} icons`);
  }

  // Generate web favicon
  await sharp(logoSvg)
    .resize(32, 32)
    .png()
    .toFile('apps/web/public/favicon.ico');
  console.log('✅ Generated favicon');

  console.log('🎉 Icon generation complete!');
}

generateIcons().catch(console.error);
