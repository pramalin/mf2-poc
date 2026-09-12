import React from 'react';
import Sidebar from './Sidebar.jsx';

export default function App() {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar active="dashboard" />
      <main style={{ padding: 32, flex: 1 }}>
        <h1>Dashboard App</h1>
        <p>Bundle: baseline-dashboard (standalone Vite build, own React copy).</p>
        <p>Served at http://localhost:5001/ — completely separate deployment from Orders and Profile.</p>
      </main>
    </div>
  );
}
