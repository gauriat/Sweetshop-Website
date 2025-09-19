import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/users');
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    if (!window.confirm('Make this user an Admin?')) return;
    try {
      await axios.put(`/api/users/${id}/make-admin`);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '2rem',
        backgroundColor: '#fff0f5',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ fontSize: '1.8rem', color: '#4B2E2E', marginBottom: '1rem' }}>
        Manage Users
      </h2>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8cdd0' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Role</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr
                key={u._id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#ffe4e9' }}
              >
                <td style={{ padding: '0.75rem' }}>{u.name}</td>
                <td style={{ padding: '0.75rem' }}>{u.email}</td>
                <td style={{ padding: '0.75rem' }}>
                  {u.isAdmin ? (
                    <span style={{ color: 'green', fontWeight: '600' }}>Admin</span>
                  ) : (
                    'User'
                  )}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {!u.isAdmin && (
                    <button
                      onClick={() => makeAdmin(u._id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#C2185B',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                      }}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}