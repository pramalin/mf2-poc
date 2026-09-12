import React, { Suspense, lazy, useState } from 'react';
import { registerRemotes, loadRemote, preloadRemote } from '@module-federation/runtime';
import { REMOTES } from './remotes.config.js';
import { loadRemoteConfig } from './loadRemoteConfig.js';
import Sidebar from './Sidebar.jsx';

// MF's own resolution mechanism: point each remote name at its
// remoteEntry.js, built from the shell's known REMOTES map. No
// mf-manifest.json anywhere — remoteEntry.js is a complete, self-describing
// entry point on its own. This has nothing to do with remote-config.js.
registerRemotes(
  Object.entries(REMOTES).map(([name, baseUrl]) => ({
    name,
    alias: name,
    entry: `${baseUrl}/remoteEntry.js`,
    type: 'module',
  }))
);

// Eagerly warm up EVERY known remote as soon as the shell itself loads,
// rather than waiting for the user to click a tab. This is what produces
// 3x remoteEntry.js and 3x remote-config.js requests on initial load,
// firing right after the shell's own bundle — one pair per remote,
// regardless of which page is shown first. Two independent preloads, fired
// in parallel per remote:
Object.entries(REMOTES).forEach(([name, baseUrl]) => {
  // 1) that remote's own runtime env (remote-config.js)
  loadRemoteConfig(baseUrl).catch(() => {
    // A remote being down shouldn't block the others from preloading —
    // the per-page loadRemote() call below will surface the real error
    // if the user actually navigates to this remote.
  });

  // 2) that remote's component code, via MF's own preload API
  // (remoteEntry.js + whatever the exposed module synchronously needs —
  // for our simple App.jsx, that includes the actual page chunk too).
  preloadRemote([{ nameOrAlias: name }]).catch(() => {});
});

// Per-page lazy components still gate actual RENDERING behind Suspense —
// this doesn't change. But since the preload above already ran, by the
// time a tab is clicked loadRemote() typically resolves from cache
// (MF runtime's own module cache, plus normal browser HTTP cache) rather
// than issuing new requests.
function lazyRemote(name) {
  return lazy(() =>
    loadRemoteConfig(REMOTES[name]).then(() => loadRemote(`${name}/App`))
  );
}

const PAGES = {
  dashboard: lazyRemote('remote_dashboard'),
  orders: lazyRemote('remote_orders'),
  profile: lazyRemote('remote_profile'),
};

export default function App() {
  const [active, setActive] = useState('dashboard');
  const ActivePage = PAGES[active];

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar active={active} onNavigate={setActive} />
      <main style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ padding: 32 }}>Loading remote module…</div>}>
          <ActivePage />
        </Suspense>
      </main>
    </div>
  );
}
