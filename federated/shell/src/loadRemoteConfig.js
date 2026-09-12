// Loads a REMOTE's own /remote-config.js by injecting a classic <script>
// tag pointing at that remote's origin. This is NOT part of Module
// Federation's resolution mechanism (registerRemotes/loadRemote handle
// that, using remoteEntry.js) — it's a separate step that gives the
// remote's own code access to its own runtime environment (e.g. the
// backend API base URL that remote calls) before/while it's used.
//
// Loading a script cross-origin via a <script> tag does not require CORS
// (unlike fetch()), which is one reason this pattern is convenient for
// apps hosted on different origins with no reverse proxy in front of them.
const loaded = new Set();

export function loadRemoteConfig(remoteBaseUrl) {
  if (loaded.has(remoteBaseUrl)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${remoteBaseUrl}/remote-config.js`;
    script.onload = () => {
      loaded.add(remoteBaseUrl);
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load remote config from ${remoteBaseUrl}`));
    document.head.appendChild(script);
  });
}
