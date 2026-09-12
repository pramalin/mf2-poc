import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

// Module Federation config inlined directly in vite.config, rather than a
// separate module-federation.config.js file. `federation()` accepts the same
// object either way — createModuleFederationConfig() just returns plain data.
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_dashboard',
      filename: 'remoteEntry.js',
      manifest: true, // also emit mf-manifest.json describing this remote
      dts: false, // skip cross-app TS type generation for this POC (needs tsconfig.json)
      exposes: {
        './App': './src/App.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
    }),
  ],
  server: { port: 5001, origin: 'http://localhost:5001', cors: true },
  preview: { port: 5001, cors: true },
  build: {
    target: 'chrome89',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
