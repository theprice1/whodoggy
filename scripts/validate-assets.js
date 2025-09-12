# WhoDoggy Asset Structure & Integration Strategy

## 1. Correct Project Structure for WhoDoggy

  ```
WhoDoggy/
├── apps/                          # Application layer
│   ├── mobile/                    # React Native app
│   │   ├── src/
│   │   │   └── assets/
│   │   │       ├── images/
│   │   │       │   ├── logo/
│   │   │       │   ├── icons/
│   │   │       │   ├── illustrations/
│   │   │       │   └── placeholders/
│   │   │       └── animations/
│   │   ├── android/
│   │   │   └── app/src/main/res/
│   │   │       ├── drawable/
│   │   │       ├── drawable-hdpi/
│   │   │       ├── drawable-mdpi/
│   │   │       ├── drawable-xhdpi/
│   │   │       ├── drawable-xxhdpi/
│   │   │       ├── drawable-xxxhdpi/
│   │   │       ├── mipmap-hdpi/
│   │   │       ├── mipmap-mdpi/
│   │   │       ├── mipmap-xhdpi/
│   │   │       ├── mipmap-xxhdpi/
│   │   │       └── mipmap-xxxhdpi/
│   │   └── ios/
│   │       └── WhoDoggy/
│   │           └── Images.xcassets/
│   │               ├── AppIcon.appiconset/
│   │               ├── LaunchScreen.imageset/
│   │               └── Contents.json
│   └── web/                       # React web app
│       ├── public/
│       │   ├── images/
│       │   ├── icons/
│       │   ├── favicon.ico
│       │   └── manifest.json
│       └── src/
│           └── assets/
│               ├── images/
│               ├── icons/
│               └── illustrations/
├── packages/                      # Shared packages
│   ├── shared/                   # Shared utilities/components
│   │   └── src/
│   │       ├── assets/          # Shared asset definitions
│   │       │   ├── icons.ts    # Icon name mappings
│   │       │   ├── images.ts   # Image constants
│   │       │   └── colors.ts   # Brand colors
│   │       └── components/
│   │           ├── Icon/       # Shared icon logic
│   │           └── Image/      # Shared image logic
│   ├── backend/                 # Backend services
│   └── ui/                      # Shared UI components
│       └── src/
│           └── assets/         # Shared UI assets
│               └── styles/     # Shared styles
├── assets/                      # Source/raw assets
│   ├── raw/                    # Original design files
│   │   ├── svg/               # Original SVG files
│   │   ├── psd/               # Photoshop files
│   │   └── figma/             # Figma exports
│   └── generated/              # Generated assets
│       ├── mobile/
│       └── web/
├── scripts/                     # Build & utility scripts
│   ├── generate-assets.js      # Asset generation
│   ├── optimize-images.js      # Image optimization
│   └── sync-assets.js          # Sync assets between platforms
└── tools/                       # Development tools
    └── asset-config/
        └── asset-map.json      # Asset configuration
```

## 2. Asset Strategy for Monorepo

### Centralized vs Distributed Assets

  ** Option A: Centralized Assets(Recommended for WhoDoggy)**
    ```
Benefits:
✅ Single source of truth
✅ Easier to maintain consistency
✅ Simpler asset generation pipeline
✅ Better for shared assets between platforms

Structure:
- Raw assets in root `/ assets / raw / `
- Generated platform-specific assets in `/ assets / generated / `
- Scripts copy to appropriate app directories during build
```

    ** Option B: Distributed Assets **
      ```
Benefits:
✅ Platform-specific optimizations
✅ Faster local development
✅ Independent app deployments

Structure:
- Each app maintains its own assets
- Shared assets duplicated (with sync script)
```

## 3. Recommended Implementation for WhoDoggy

### Root - Level Asset Configuration

  ```javascript
// tools/asset-config/asset-map.json
{
  "version": "1.0.0",
  "assets": {
    "logo": {
      "source": "assets/raw/svg/logo.svg",
      "outputs": {
        "mobile": {
          "ios": {
            "sizes": [20, 29, 40, 60, 76, 83.5, 1024],
            "path": "apps/mobile/ios/WhoDoggy/Images.xcassets/AppIcon.appiconset/"
          },
          "android": {
            "sizes": {
              "mdpi": 48,
              "hdpi": 72,
              "xhdpi": 96,
              "xxhdpi": 144,
              "xxxhdpi": 192
            },
            "path": "apps/mobile/android/app/src/main/res/"
          }
        },
        "web": {
          "sizes": [16, 32, 192, 512],
          "formats": ["png", "webp", "svg"],
          "path": "apps/web/public/icons/"
        }
      }
    },
    "icons": {
      "source": "assets/raw/svg/icons/*.svg",
      "outputs": {
        "mobile": {
          "format": "svg",
          "path": "apps/mobile/src/assets/icons/"
        },
        "web": {
          "format": ["svg", "react-component"],
          "path": "apps/web/src/assets/icons/"
        }
      }
    }
  }
}
```

### Master Asset Generation Script

  ```javascript
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
          : `Icon - ${ size } @${ scale } x.png`;

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
          `assets / generated / mobile / android / mipmap - ${ density }/ic_launcher.png`
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
```

## 4. Shared Asset Components in Packages

### Shared Icon Types and Mappings

```typescript
// packages/shared/src/assets/icons.ts
export const ICON_NAMES = [
  'home',
  'search',
  'scan',
  'profile',
  'settings',
  'microchip',
  'vaccination',
  'location',
  'phone',
  'email',
  'back',
  'menu',
  'notification',
  'success',
  'error',
  'warning',
  'info',
  'male',
  'female',
  'verified',
] as const;

export type IconName = typeof ICON_NAMES[number];

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}
```

### Shared Brand Colors

```typescript
// packages/shared/src/assets/colors.ts
export const Colors = {
  light: {
    primary: '#2D89EF',
    secondary: '#F5A623',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#2C3E50',
    textSecondary: '#666666',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
  dark: {
    primary: '#4799F0',
    secondary: '#F7B84B',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#EAEAEA',
    textSecondary: '#999999',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ColorName = keyof typeof Colors.light;
```

### Shared Image Constants

```typescript
// packages/shared/src/assets/images.ts
export const Images = {
  logo: {
    primary: 'logo.svg',
    dark: 'logo-dark.svg',
    icon: 'icon.png',
  },
  placeholders: {
    dog: 'placeholders/dog-placeholder.png',
    owner: 'placeholders/owner-placeholder.png',
    noImage: 'placeholders/no-image.png',
  },
  illustrations: {
    login: 'illustrations/login.svg',
    signup: 'illustrations/signup.svg',
    forgotPassword: 'illustrations/forgot-password.svg',
    emptyState: 'illustrations/empty-state.svg',
    success: 'illustrations/success.svg',
    error: 'illustrations/error.svg',
    noResults: 'illustrations/no-results.svg',
  },
  backgrounds: {
    splash: 'backgrounds/splash.png',
    hero: 'backgrounds/hero.jpg',
    pattern: 'backgrounds/pattern.svg',
  },
} as const;

export type ImageCategory = keyof typeof Images;
export type ImageName<T extends ImageCategory> = keyof typeof Images[T];
```

## 5. Platform-Specific Implementations

### Mobile Icon Component

```typescript

import { IconName, IconProps } from '@whodoggy/shared/assets';
// apps/mobile/src/components/Icon/Icon.tsx
import React from 'react';

// Dynamic imports for all icons
const iconMap: Record<IconName, any> = {
  home: require('../../assets/icons/home.svg').default,
  search: require('../../assets/icons/search.svg').default,
  scan: require('../../assets/icons/scan.svg').default,
  // ... etc
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#2D89EF',
  style
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      style={style}
    />
  );
};
```

### Web Icon Component

```typescript

import { IconName, IconProps } from '@whodoggy/shared/assets';
// apps/web/src/components/Icon/Icon.tsx
import React, { lazy, Suspense } from 'react';

// Lazy load icon components
const iconComponents: Record<IconName, React.LazyExoticComponent<any>> = {
  home: lazy(() => import('../../assets/icons/HomeIcon')),
  search: lazy(() => import('../../assets/icons/SearchIcon')),
  scan: lazy(() => import('../../assets/icons/ScanIcon')),
  // ... etc
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#2D89EF',
  className,
}) => {
  const IconComponent = iconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <Suspense fallback={<div style={{ width: size, height: size }} />}>
      <IconComponent
        size={size}
        color={color}
        className={className}
      />
    </Suspense>
  );
};
```

## 6. Package.json Scripts

### Root package.json

```json
{
  "name": "whodoggy",
    "private": true,
      "workspaces": [
        "apps/*",
        "packages/*"
      ],
        "scripts": 
    "assets:generate": "node scripts/generate-assets.js",
      "assets:optimize": "node scripts/optimize-images.js",
        "assets:sync": "node scripts/sync-assets.js",
          "assets:validate": "node scripts/validate-assets.js",
            "assets:clean": "rimraf assets/generated apps/*/src/assets/generated",
              "prebuild": "npm run assets:generate",
                "build": "turbo run build",
                  "dev": "turbo run dev --parallel",
  "devDependencies": 
    "sharp": "^0.32.0",
      "svgo": "^3.0.0",
        "fs-extra": "^11.0.0",
          "turbo": "^1.10.0"
}
```

### Mobile app package.json

```json
{
  "name": "@whodoggy/mobile",
    "scripts": 
    "assets:ios": "npm run assets:generate --workspace=whodoggy && node ../../scripts/sync-ios-assets.js",
      "assets:android": "npm run assets:generate --workspace=whodoggy && node ../../scripts/sync-android-assets.js",
        "ios": "npm run assets:ios && react-native run-ios",
          "android": "npm run assets:android && react-native run-android"
}
```

### Web app package.json

```json
{
  "name": "@whodoggy/web",
    "scripts": 
    "assets:web": "npm run assets:generate --workspace=whodoggy && node ../../scripts/sync-web-assets.js",
      "dev": "npm run assets:web && next dev",
        "build": "npm run assets:web && next build"
}
```

## 7. Validation Script

```javascript
// scripts/validate-assets.js
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const requiredAssets = {
  'apps/mobile/ios/WhoDoggy/Images.xcassets': [
    'AppIcon.appiconset/Icon-1024.png',
    'LaunchScreen.imageset/LaunchScreen.png'
  ],
  'apps/mobile/android/app/src/main/res': [
    'mipmap-xxxhdpi/ic_launcher.png',
    'drawable-xxxhdpi/launch_screen.png'
  ],
  'apps/web/public': [
    'favicon.ico',
    'icons/icon-192.png',
    'icons/icon-512.png'
  ]
};

function validateAssets() {
  console.log(chalk.blue('🔍 Validating WhoDoggy assets...\n'));

  let hasErrors = false;

  for (const [basePath, files] of Object.entries(requiredAssets)) {
    console.log(chalk.yellow(`Checking ${basePath}...`));

    for (const file of files) {
      const fullPath = path.join(process.cwd(), basePath, file);

      if (fs.existsSync(fullPath)) {
        console.log(chalk.green(`  ✅ ${file}`));
      } else {
        console.log(chalk.red(`  ❌ ${file} - MISSING`));
        hasErrors = true;
      }
    }
    console.log('');
  }

  if (hasErrors) {
    console.log(chalk.red('❌ Some assets are missing!'));
    console.log(chalk.yellow('Run "npm run assets:generate" to create them.'));
    process.exit(1);
  } else {
    console.log(chalk.green('✅ All required assets are present!'));
  }
}

validateAssets();
```

## 8. Development Workflow

### Initial Setup
```bash
# 1. Install dependencies
npm install

# 2. Place raw SVG files in assets / raw / svg /
  mkdir - p assets / raw / svg / { icons, illustrations }

# 3. Generate all assets
npm run assets: generate

# 4. Validate assets
npm run assets: validate
  ```

### Daily Development
```bash
# Start development with asset watching
npm run dev

# Mobile development
cd apps / mobile
npm run ios    # Includes asset sync
npm run android # Includes asset sync

# Web development
cd apps / web
npm run dev    # Includes asset sync
  ```

### Adding New Assets
```bash
# 1. Add new SVG to assets / raw / svg /
  cp new- icon.svg assets / raw / svg / icons /

# 2. Regenerate assets
npm run assets: generate

# 3. Update shared types
# Edit packages / shared / src / assets / icons.ts

# 4. Restart development servers
npm run dev
  ```

## 9. CI/CD Integration

```yaml
#.github / workflows / assets.yml
name: Asset Generation

on:
push:
paths:
- 'assets/raw/**'
  - 'scripts/generate-assets.js'

jobs:
generate:
runs - on: ubuntu - latest
steps:
- uses: actions / checkout@v3

- uses: actions / setup - node@v3
with:
node - version: '18'

  - run: npm ci

    - name: Generate assets
run: npm run assets: generate

  - name: Validate assets
run: npm run assets: validate

  - name: Commit generated assets
run: |
  git config--global user.name 'GitHub Actions'
          git config--global user.email 'actions@github.com'
          git add apps/*/src/assets
          git add apps/*/public
          git commit - m "chore: regenerate assets [skip ci]" || true
          git push
  ```

## Summary

This structure:
- ✅ Maintains WhoDoggy's existing `apps / ` and `packages / ` separation
- ✅ Centralizes raw assets in root `/ assets / ` directory
- ✅ Shares common asset logic in `packages / shared / `
- ✅ Automates asset generation and distribution
- ✅ Supports both platforms with proper optimization
- ✅ Enables type-safe asset usage across the monorepo
