import React from 'react';
import Sidebar from './Sidebar.jsx';

export default function App() {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar active="profile" />
      <main style={{ padding: 32, flex: 1 }}>
        <h1>Profile App</h1>
        <p>Bundle: baseline-profile (standalone Vite build, own React copy).</p>
        <p>Served at http://localhost:5003/ — completely separate deployment from Dashboard and Orders.</p>
      </main>
    </div>
  );
}
