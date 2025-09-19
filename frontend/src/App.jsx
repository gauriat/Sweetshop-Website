import React, { useContext } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import AdminEdit from './pages/AdminEdit';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import { AuthContext } from './context/AuthContext';
import AdminUsers from './pages/AdminUsers';

export default function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "linear-gradient(90deg, #6B3F69, #FCB53B)",
        color: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", letterSpacing: "1px" }}>
         Mithaas & Memories
      </h1>
      <nav>
        {user ? (
          <>
            <span style={{ marginRight: 16, fontWeight: "500" }}>
              Hi, {user.name}
            </span>
            {user.isAdmin && (
              <Link
                to="/admin"
                style={{marginRight: 16, textDecoration: "none", color: "white", fontWeight: "500",}}
              >
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#FFC29B",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/authpage"
              style={{textDecoration: "none", color: "white", fontWeight: "500",}}
            >
              Sign In?
            </Link>
          </>
        )}
      </nav>
    </header>


      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authpage" element={<AuthPage />} /> 
          <Route path="/admin" element={user && user.isAdmin ? <AdminProducts /> : <Navigate to="/login" />} />
          <Route path="/admin/new" element={user && user.isAdmin ? <AdminEdit /> : <Navigate to="/login" />} />
          <Route path="/admin/:id" element={user && user.isAdmin ? <AdminEdit /> : <Navigate to="/login" />} />
          <Route path="/admin/users" element={user && user.isAdmin ? <AdminUsers /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}