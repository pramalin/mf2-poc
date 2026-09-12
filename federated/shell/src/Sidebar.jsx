import React from 'react';

// SINGLE SOURCE OF TRUTH. Only exists here in the shell now.
// Compare to baseline/*/src/Sidebar.jsx, which was copy-pasted 3 times.
export default function Sidebar({ active, onNavigate }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'orders', label: 'Orders' },
    { key: 'profile', label: 'Profile' },
  ];

  return (
    <nav style={{
      width: 200,
      minHeight: '100vh',
      background: '#1f2937',
      color: 'white',
      padding: '16px 0',
      boxSizing: 'border-box',
    }}>
      <div style={{ padding: '0 16px', fontWeight: 700, marginBottom: 24 }}>ACME Portal</div>
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => onNavigate(item.key)}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 16px',
            color: item.key === active ? '#93c5fd' : 'white',
            background: item.key === active ? '#111827' : 'transparent',
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
