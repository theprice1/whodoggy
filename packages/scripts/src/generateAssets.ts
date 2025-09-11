// packages/scripts/src/generateAssets.ts
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

interface AssetConfig {
  input: string;
  outputs: {
    path: string;
    width: number;
    height: number;
    format: 'png' | 'webp' | 'svg';
  }[];
}

const ASSET_CONFIGS: AssetConfig[] = [
  // App Icons from logo-icon-only.svg
  {
    input: 'assets/raw/svg/logo/logo-icon-only.svg',
    outputs: [
      // Mobile app icons
      { path: 'apps/mobile/assets/icon.png', width: 1024, height: 1024, format: 'png' },
      { path: 'apps/mobile/assets/adaptive-icon.png', width: 1024, height: 1024, format: 'png' },
      { path: 'apps/mobile/assets/favicon.png', width: 32, height: 32, format: 'png' },

      // iOS app icon sizes
      { path: 'apps/mobile/ios/WhoDoggy/Images.xcassets/AppIcon.appiconset/icon-1024.png', width: 1024, height: 1024, format: 'png' },
      { path: 'apps/mobile/ios/WhoDoggy/Images.xcassets/AppIcon.appiconset/icon-180.png', width: 180, height: 180, format: 'png' },
      { path: 'apps/mobile/ios/WhoDoggy/Images.xcassets/AppIcon.appiconset/icon-120.png', width: 120, height: 120, format: 'png' },
      { path: 'apps/mobile/ios/WhoDoggy/Images.xcassets/AppIcon.appiconset/icon-60.png', width: 60, height: 60, format: 'png' },

      // Android app icon sizes
      { path: 'apps/mobile/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', width: 192, height: 192, format: 'png' },
      { path: 'apps/mobile/android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', width: 144, height: 144, format: 'png' },
      { path: 'apps/mobile/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png', width: 96, height: 96, format: 'png' },
      { path: 'apps/mobile/android/app/src/main/res/mipmap-hdpi/ic_launcher.png', width: 72, height: 72, format: 'png' },
      { path: 'apps/mobile/android/app/src/main/res/mipmap-mdpi/ic_launcher.png', width: 48, height: 48, format: 'png' },

      // Web icons
      { path: 'apps/web/public/favicon.ico', width: 32, height: 32, format: 'png' },
      { path: 'apps/web/public/logo192.png', width: 192, height: 192, format: 'png' },
      { path: 'apps/web/public/logo512.png', width: 512, height: 512, format: 'png' },
    ]
  },

  // Splash screens from splash-mobile.svg
  {
    input: 'assets/raw/svg/splash/splash-mobile.svg',
    outputs: [
      { path: 'apps/mobile/assets/splash.png', width: 1242, height: 2688, format: 'png' },
      { path: 'apps/mobile/assets/splash@2x.png', width: 2484, height: 5376, format: 'png' },
    ]
  },

  // UI Icons - generate at multiple resolutions for mobile
  ...['home', 'search', 'scan', 'profile', 'settings', 'add', 'edit', 'delete', 'share', 'success', 'error', 'warning', 'info', 'microchip'].map(iconName => ({
    input: `assets/raw/svg/icons/**/${iconName}.svg`,
    outputs: [
      // Mobile PNG versions
      { path: `apps/mobile/src/assets/icons/${iconName}.png`, width: 24, height: 24, format: 'png' as const },
      { path: `apps/mobile/src/assets/icons/${iconName}@2x.png`, width: 48, height: 48, format: 'png' as const },
      { path: `apps/mobile/src/assets/icons/${iconName}@3x.png`, width: 72, height: 72, format: 'png' as const },

      // Web SVG versions (keep as SVG for crisp scaling)
      { path: `apps/web/public/assets/icons/${iconName}.svg`, width: 24, height: 24, format: 'svg' as const },

      // Shared assets
      { path: `packages/shared/src/assets/icons/${iconName}.svg`, width: 24, height: 24, format: 'svg' as const },
    ]
  }))
];

async function generateAssets() {
  console.log('🎨 Generating WhoDoggy assets...');

  for (const config of ASSET_CONFIGS) {
    // Handle glob patterns for icons
    const inputFiles = config.input.includes('**')
      ? await findIconFiles(config.input)
      : [config.input];

    for (const inputFile of inputFiles) {
      if (!await fileExists(inputFile)) {
        console.warn(`⚠️  Input file not found: ${inputFile}`);
        continue;
      }

      for (const output of config.outputs) {
        try {
          const dir = path.dirname(output.path);
          await fs.mkdir(dir, { recursive: true });

          if (output.format === 'svg') {
            // Copy SVG directly
            await fs.copyFile(inputFile, output.path);
          } else {
            // Convert to raster format using Sharp
            await sharp(inputFile)
              .resize(output.width, output.height, {
                background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
              })
              .png()
              .toFile(output.path);
          }

          console.log(`✅ Generated: ${output.path}`);
        } catch (error) {
          console.error(`❌ Failed to generate ${output.path}:`, error);
        }
      }
    }
  }

  console.log('🎉 Asset generation complete!');
}

async function findIconFiles(pattern: string): Promise<string[]> {
  // Simplified glob implementation for icon finding
  const iconDirs = [
    'assets/raw/svg/icons/navigation',
    'assets/raw/svg/icons/actions',
    'assets/raw/svg/icons/status',
    'assets/raw/svg/icons/dog'
  ];

  const iconFiles: string[] = [];
  for (const dir of iconDirs) {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        if (file.endsWith('.svg')) {
          iconFiles.push(path.join(dir, file));
        }
      }
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }
  return iconFiles;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

if (require.main === module) {
  generateAssets().catch(console.error);
}

export { generateAssets };
