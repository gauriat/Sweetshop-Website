import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  // Reusable styles
  const thStyle = {
    padding: '0.75rem',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #ddd',
  };

  const tdStyle = {
    padding: '0.75rem',
    borderBottom: '1px solid #eee',
    color: '#4B2E2E',
  };

  const actionBtnStyle = {
    marginRight: '0.5rem',
    padding: '0.4rem 0.8rem',
    backgroundColor: '#C2185B',
    color: '#fff',
    border: 'none',
    borderRadius: '0.4rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '40px auto',
        padding: '2rem',
        backgroundColor: '#fff0f5',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontSize: '1.8rem',
            color: '#4B2E2E',
            fontWeight: '700',
          }}
        >
          Admin — Products
        </h2>
        <Link to="/admin/new">
          <button
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#C2185B',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#AD1457')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#C2185B')}
          >
            Add Product
          </button>
        </Link>
        <Link to="/admin/users">
          <button
            style={{
              padding: '0.6rem 1.2rem',
              backgroundColor: '#C2185B',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#AD1457')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#C2185B')}
          >
            Add More Admins?
          </button>
        </Link>
      </div>

      {/* Loading/Error */}
      {loading ? (
        <p style={{ textAlign: 'center', fontWeight: '500', color: '#5C4B51' }}>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8cdd0', color: '#4B2E2E' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={p._id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#ffe4e9' }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>₹{p.price}</td>
                <td style={tdStyle}>{p.countInStock}</td>
                <td style={tdStyle}>
                  <Link to={`/admin/${p._id}`}>
                    <button
                      style={actionBtnStyle}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#AD1457')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#C2185B')}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    style={{
                      ...actionBtnStyle,
                      backgroundColor: '#e57373',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#d32f2f')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#e57373')}
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}