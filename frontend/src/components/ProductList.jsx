import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { AuthContext } from '../context/AuthContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useContext(AuthContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const q = [];
      if (keyword) q.push(`keyword=${encodeURIComponent(keyword)}`);
      if (category) q.push(`category=${encodeURIComponent(category)}`);
      const query = q.length ? `?${q.join('&')}` : '';
      const { data } = await axios.get(`/api/products${query}`);
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const onSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="Search sweets..." value={keyword} onChange={e=>setKeyword(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Traditional">Traditional</option>
          <option value="Fried">Fried</option>
          <option value="Premium">Premium</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onPurchased={() => {
            fetchProducts();
          }} />
        ))}
      </div>
    </div>
  );
}
