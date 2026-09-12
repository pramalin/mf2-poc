import React from 'react';
import Sidebar from './Sidebar.jsx';

export default function App() {
  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif' }}>
      <Sidebar active="orders" />
      <main style={{ padding: 32, flex: 1 }}>
        <h1>Orders App</h1>
        <p>Bundle: baseline-orders (standalone Vite build, own React copy).</p>
        <p>Served at http://localhost:5002/ — completely separate deployment from Dashboard and Profile.</p>
      </main>
    </div>
  );
}
