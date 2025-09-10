// scripts/generate-assets.js
const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { optimize } = require('svgo');
const assetConfig = require('../tools/asset-config/asset-map.json');

class AssetGenerator {
  constructor() {
    this.rootDir = process.cwd();
    this.config = assetConfig;
  }

  async generateAll() {
    console.log('🎨 Starting WhoDoggy asset generation...\n');

    // Clean previous generated assets
    await this.cleanGenerated();

    // Generate app icons
    await this.generateAppIcons();

    // Generate UI icons
    await this.generateUIIcons();

    // Generate illustrations
    await this.generateIllustrations();

    // Generate splash screens
    await this.generateSplashScreens();

    // Copy to app directories
    await this.syncToApps();

    console.log('\n✅ Asset generation complete!');
  }

  async cleanGenerated() {
    const generatedPath = path.join(this.rootDir, 'assets/generated');
    await fs.emptyDir(generatedPath);
  }

  async generateAppIcons() {
    console.log('📱 Generating app icons...');

    const logoPath = path.join(this.rootDir, 'assets/raw/svg/logo.svg');
    const logoSvg = await fs.readFile(logoPath);

    // iOS Icons
    const iosSizes = [20, 29, 40, 60, 76, 83.5, 1024];
    for (const size of iosSizes) {
      for (const scale of [1, 2, 3]) {
        if (size === 1024 && scale > 1) continue; // 1024 is only 1x

        const actualSize = size * scale;
        const filename = size === 1024
          ? 'Icon-1024.png'
          : `Icon-${size}@${scale}x.png`;

        await sharp(logoSvg)
          .resize(actualSize, actualSize)
          .png()
          .toFile(path.join(
            this.rootDir,
            'assets/generated/mobile/ios',
            filename
          ));
      }
    }

    // Android Icons
    const androidSizes = {
      'mdpi': 48,
      'hdpi': 72,
      'xhdpi': 96,
      'xxhdpi': 144,
      'xxxhdpi': 192
    };

    for (const [density, size] of Object.entries(androidSizes)) {
      await sharp(logoSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(
          this.rootDir,
          `assets/generated/mobile/android/mipmap-${density}/ic_launcher.png`
        ));

      // Also generate round version for Android
      await sharp(logoSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(
          this.rootDir,
          `assets/generated/mobile/android/mipmap-${density}/ic_launcher_round.png`
        ));
    }

    // Web Icons
    const webSizes = [16, 32, 180, 192, 512];
    for (const size of webSizes) {
      // PNG version
      await sharp(logoSvg)
        .resize(size, size)
        .png()
        .toFile(path.join(
          this.rootDir,
          `assets/generated/web/icon-${size}.png`
        ));

      // WebP version for modern browsers
      await sharp(logoSvg)
        .resize(size, size)
        .webp({ quality: 90 })
        .toFile(path.join(
          this.rootDir,
          `assets/generated/web/icon-${size}.webp`
        ));
    }

    console.log('✅ App icons generated');
  }

  async generateUIIcons() {
    console.log('🎯 Generating UI icons...');

    const iconsDir = path.join(this.rootDir, 'assets/raw/svg/icons');
    const icons = await fs.readdir(iconsDir);

    for (const icon of icons) {
      if (!icon.endsWith('.svg')) continue;

      const iconPath = path.join(iconsDir, icon);
      const iconSvg = await fs.readFile(iconPath, 'utf8');

      // Optimize SVG
      const optimized = optimize(iconSvg, {
        plugins: [
          'preset-default',
          'prefixIds',
          {
            name: 'removeViewBox',
            active: false
          }
        ]
      });

      // Save optimized SVG for mobile
      await fs.outputFile(
        path.join(this.rootDir, 'assets/generated/mobile/icons', icon),
        optimized.data
      );

      // Save optimized SVG for web
      await fs.outputFile(
        path.join(this.rootDir, 'assets/generated/web/icons', icon),
        optimized.data
      );

      // Generate React component for web
      await this.generateReactComponent(icon, optimized.data);
    }

    console.log(`✅ ${icons.length} UI icons generated`);
  }

  async generateReactComponent(filename, svgContent) {
    const componentName = filename
      .replace('.svg', '')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('') + 'Icon';

    const component = `
import React from 'react';

export const ${componentName}: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 24, color = 'currentColor', className }) => (
  ${svgContent
        .replace(/width="[^"]*"/, 'width={size}')
        .replace(/height="[^"]*"/, 'height={size}')
        .replace(/fill="[^"]*"/g, 'fill={color}')
        .replace(/class=/g, 'className=')}
);
`;

    await fs.outputFile(
      path.join(this.rootDir, 'assets/generated/web/icons/components', `${componentName}.tsx`),
      component
    );
  }

  async generateSplashScreens() {
    console.log('🖼️ Generating splash screens...');

    const splashPath = path.join(this.rootDir, 'assets/raw/svg/splash.svg');
    const splashSvg = await fs.readFile(splashPath);

    // iOS Splash Screens (various iPhone sizes)
    const iosSplashSizes = [
      { width: 1242, height: 2688, name: 'LaunchImage-1242x2688' }, // iPhone 11 Pro Max
      { width: 1125, height: 2436, name: 'LaunchImage-1125x2436' }, // iPhone X/XS
      { width: 750, height: 1334, name: 'LaunchImage-750x1334' },   // iPhone 8
      { width: 1242, height: 2208, name: 'LaunchImage-1242x2208' }, // iPhone 8 Plus
    ];

    for (const size of iosSplashSizes) {
      await sharp(splashSvg)
        .resize(size.width, size.height, { fit: 'cover' })
        .png()
        .toFile(path.join(
          this.rootDir,
          'assets/generated/mobile/ios/splash',
          `${size.name}.png`
        ));
    }

    // Android Splash Screens
    const androidSplashSizes = [
      { width: 480, height: 800, density: 'mdpi' },
      { width: 720, height: 1280, density: 'hdpi' },
      { width: 960, height: 1600, density: 'xhdpi' },
      { width: 1440, height: 2560, density: 'xxhdpi' },
      { width: 1920, height: 3200, density: 'xxxhdpi' },
    ];

    for (const size of androidSplashSizes) {
      await sharp(splashSvg)
        .resize(size.width, size.height, { fit: 'cover' })
        .png()
        .toFile(path.join(
          this.rootDir,
          `assets/generated/mobile/android/drawable-${size.density}/launch_screen.png`
        ));
    }

    console.log('✅ Splash screens generated');
  }

  async syncToApps() {
    console.log('📦 Syncing assets to apps...');

    // Copy iOS assets
    await fs.copy(
      path.join(this.rootDir, 'assets/generated/mobile/ios'),
      path.join(this.rootDir, 'apps/mobile/ios/WhoDoggy/Images.xcassets')
    );

    // Copy Android assets
    await fs.copy(
      path.join(this.rootDir, 'assets/generated/mobile/android'),
      path.join(this.rootDir, 'apps/mobile/android/app/src/main/res')
    );

    // Copy mobile shared assets
    await fs.copy(
      path.join(this.rootDir, 'assets/generated/mobile/icons'),
      path.join(this.rootDir, 'apps/mobile/src/assets/icons')
    );

    // Copy web assets
    await fs.copy(
      path.join(this.rootDir, 'assets/generated/web'),
      path.join(this.rootDir, 'apps/web/public')
    );

    // Copy web component assets
    await fs.copy(
      path.join(this.rootDir, 'assets/generated/web/icons/components'),
      path.join(this.rootDir, 'apps/web/src/assets/icons')
    );

    console.log('✅ Assets synced to apps');
  }
}

// Run generator
const generator = new AssetGenerator();
generator.generateAll().catch(console.error);
