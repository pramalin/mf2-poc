// The shell's own knowledge of WHERE each remote is hosted. This is
// separate from remote-config.js (which is per-remote runtime env, see
// loadRemoteConfig.js) — this file only answers "what origin do I fetch
// remoteEntry.js from for each remote".
//
// In this POC these are hardcoded for local dev. In a real deployment
// these values would typically come from the shell's own build-time env
// (a normal Vite `import.meta.env.VITE_*`, baked in per environment at
// build time) or a small per-environment config file swapped at deploy
// time — NOT from remote-config.js, which the shell does not fetch for
// itself at all.
export const REMOTES = {
  remote_dashboard: 'http://localhost:5001',
  remote_orders: 'http://localhost:5002',
  remote_profile: 'http://localhost:5003',
};
