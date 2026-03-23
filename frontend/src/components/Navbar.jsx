import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          Dish<span>Dash</span>
        </Link>

        {/* Mobile hamburger */}
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileOpen ? 'nav-open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/compare" className={location.pathname === '/compare' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Compare</Link>
          <Link to="/deals" className={location.pathname === '/deals' ? 'active' : ''} onClick={() => setMobileOpen(false)}>Featured Deals</Link>
          <Link to="/favorites" className={location.pathname === '/favorites' ? 'active' : ''} onClick={() => setMobileOpen(false)}>My Favorites</Link>
          <button className="dark-mode-btn" onClick={toggleDarkMode} title="Toggle Dark Mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--secondary)' }}>
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="btn-login"
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#e74c3c', border: 'none', cursor: 'pointer' }}
                title="Logout"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn-login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
