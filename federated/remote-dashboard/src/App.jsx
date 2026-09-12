import React from 'react';

// Captured once, at module top-level — this module only executes once
// (the first time the shell lazy-loads it; MF/import caching means
// subsequent visits reuse this same module instance without re-running
// this line). That matters because window.CONFIG is a shared global that
// gets overwritten each time a DIFFERENT remote's remote-config.js loads —
// capturing it here, once, protects this component from picking up a
// later, unrelated remote's values.
const CONFIG = window.CONFIG || {};

export default function App() {
  return (
    <div style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1>Dashboard</h1>
      <p>Served from <code>remote_dashboard</code> on port 5001, resolved via
      its <code>remoteEntry.js</code> — no manifest involved.</p>
      <p>Runtime config received from <em>this remote's own</em>
      <code> /remote-config.js</code> (loaded by the shell before this
      component ran):</p>
      <ul>
        <li><code>VITE_BASE_URL</code>: {CONFIG.VITE_BASE_URL ?? '(not set)'}</li>
        <li><code>VITE_ONBOARDING_BASE_URL</code>: {CONFIG.VITE_ONBOARDING_BASE_URL ?? '(not set)'}</li>
      </ul>
    </div>
  );
}
