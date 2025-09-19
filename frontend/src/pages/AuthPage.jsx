import React from 'react';
import Login from './Login';
import Register from './Register';

export default function AuthPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        padding: '3rem',
        backgroundColor: '#fff0f5',
        minHeight: '100vh',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Register Section */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <Register />
        <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: '500', color: '#4B2E2E' }}>
          Already registered? <span style={{ fontStyle: 'italic' }}>Please login →</span>
        </p>
      </div>

      {/* Login Section */}
      <div style={{ flex: 1, maxWidth: 480 }}>
        <Login />
        <p style={{ textAlign: 'center', marginTop: '1rem', fontWeight: '500', color: '#4B2E2E' }}>
          New here? <span style={{ fontStyle: 'italic' }}>Create an account →</span>
        </p>
      </div>
    </div>
  );
}