import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Standalone entry point - only used when running this remote directly
// (e.g. for isolated dev/testing). The shell never loads this file.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
