// Each remote serves its OWN /remote-config.js — this is per-remote, not
// something the shell aggregates. The shell loads this via a dynamically
// injected <script> tag (see shell/src/loadRemoteConfig.js) before using
// this remote, so that by the time this remote's exposed component runs,
// window.CONFIG already holds ITS OWN environment values.
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.federation' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

function readEnvObject() {
  return {
    VITE_BASE_URL: process.env.VITE_BASE_URL,
    VITE_ONBOARDING_BASE_URL: process.env.VITE_ONBOARDING_BASE_URL,
  };
}

app.get('/remote-config.js', (_req, res) => {
  res.type('application/javascript');
  res.send(`window.CONFIG=${JSON.stringify(readEnvObject())};`);
});

// CORS needed here: the shell's registerRemotes() fetch for remoteEntry.js
// and the <script> load for remote-config.js both cross origins in local
// dev (different ports stand in for different hosts / no reverse proxy).
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve this remote's own built dist/ (remoteEntry.js, App-<hash>.js, etc.)
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`remote_orders (with own remote-config.js) listening on http://localhost:${PORT}`);
});
