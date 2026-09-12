import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shell',
      dts: false,
      // NOTE: no static `remotes` here. Remote URLs aren't known at build
      // time — they come from window.CONFIG (populated by
      // /remote-config.js) at runtime, read in src/App.jsx via
      // registerRemotes()/loadRemote() from @module-federation/runtime.
      // This is the dynamic-remotes pattern, used specifically because
      // there's no reverse proxy fixing these URLs.
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
    }),
  ],
  server: { port: 4000, origin: 'http://localhost:4000', cors: true },
  preview: { port: 4000, cors: true },
  build: {
    target: 'chrome89',
    modulePreload: false,
    cssCodeSplit: false,
  },
});
