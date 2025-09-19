import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function ProductCard({ product, onPurchased }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const buy = async () => {
    if (!user) { return alert('Please login to purchase'); }
    try {
      setLoading(true);
      await axios.post(`/api/products/${product._id}/purchase`);
      alert('Purchase successful');
      if (onPurchased) onPurchased();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <img src={product.image || 'https://via.placeholder.com/400x300'} alt={product.name} style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 6 }} />
      <h3 style={{ marginTop: 8 }}>{product.name}</h3>
      <p style={{ margin: 0 }}>{product.description}</p>
      <p style={{ fontWeight: 'bold', marginTop: 6 }}>₹{product.price}</p>
      <p>Stock: {product.countInStock}</p>
      <button onClick={buy} disabled={product.countInStock === 0 || loading} style={{ padding: '8px 12px', borderRadius: 6 }}>
        {product.countInStock === 0 ? 'Out of stock' : loading ? 'Processing...' : 'Purchase'}
      </button>
    </div>
  );
}
