import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function AdminEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    countInStock: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const { data } = await axios.get('/api/products');
        const p = data.find((x) => x._id === id);
        if (p) setProduct(p);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(`/api/products/${id}`, product);
      } else {
        await axios.post('/api/products', product);
      }
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: '2rem',
        backgroundColor: '#fff0f5',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          color: '#4B2E2E',
          fontWeight: '700',
          textAlign: 'center',
        }}
      >
        {id ? 'Edit Product' : 'Add Product'}
      </h2>

      <form onSubmit={submit} style={{ display: 'grid', gap: '1rem' }}>
        <input
          placeholder="Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          required
          style={inputStyle}
        />
        <input
          placeholder="Image (URL or /images/...)"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Category"
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Stock"
          value={product.countInStock}
          onChange={(e) => setProduct({ ...product, countInStock: Number(e.target.value) })}
          style={inputStyle}
        />
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
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
          {loading ? 'Saving...' : 'Save'}
        </button>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>{error}</p>
        )}
      </form>
    </div>
  );
}

// Reusable input style
const inputStyle = {
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid #ccc',
  fontSize: '1rem',
  width: '100%',
};