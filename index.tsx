
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// process.env가 없는 환경을 위한 안전장치 추가
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: {} };
}

console.log("Seoul Fire AI Platform Initializing...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Error: Root element '#root' not found in DOM.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Seoul Fire AI Platform Rendered Successfully.");
  } catch (error) {
    console.error("Rendering Error:", error);
  }
}
