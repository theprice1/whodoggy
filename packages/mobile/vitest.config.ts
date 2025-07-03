// packages/mobile/vitest.config.mts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This is optional if you have react-native mocks to resolve
      'react-native': path.resolve(__dirname, './src/__mocks__/react-native.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    testTransformMode: {
      web: ['tsx', 'ts'], // only extensions as strings here
    },
    setupFiles: './src/__test__/setup.ts',
  },
})
