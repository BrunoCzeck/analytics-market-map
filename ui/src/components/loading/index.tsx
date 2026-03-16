import React from 'react';

export function Loading() {
  return (
    <div style={{
      width: '24px',
      height: '24px',
      border: '2px solid rgba(255,255,255,0.1)',
      borderTop: '2px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
