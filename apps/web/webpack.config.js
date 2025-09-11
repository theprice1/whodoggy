// apps/web/webpack.config.js
const path = require('path');

module.exports = {
  // ... existing config
  module: {
    rules: [
      // ... existing rules
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              dimensions: false,
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    ...config.resolve,
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@whodoggy/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
};
