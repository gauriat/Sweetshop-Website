import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const { data } = await axios.post('/api/users/register', { name, email, password });
      setUser(data);
      navigate('/productlist');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
  style={{
    maxWidth: 480,
    margin: '60px auto',
    padding: '2rem',
    backgroundColor: '#fff0f5',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    fontFamily: 'Segoe UI, sans-serif',
  }}
>
  <h2
    style={{
      fontSize: '2rem',
      marginBottom: '1.5rem',
      color: '#4B2E2E',
      textAlign: 'center',
      fontWeight: '700',
    }}
  >
    Create Your Account
  </h2>

  <form onSubmit={submitHandler}>
    {/* Name Field */}
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#5C4B51',
        }}
      >
        Name
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
    </div>

    {/* Email Field */}
    <div style={{ marginBottom: '1rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#5C4B51',
        }}
      >
        Email
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
    </div>

    {/* Password Field */}
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: '600',
          color: '#5C4B51',
        }}
      >
        Password
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#C2185B',
        color: '#fff',
        fontWeight: '600',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#AD1457')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#C2185B')}
    >
      Register
    </button>

    {/* Error Message */}
    {error && (
      <p
        style={{
          color: 'red',
          marginTop: '1rem',
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        {error}
      </p>
    )}
  </form>
</div>
  );
}
