import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link to="/auth" className="btn-login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>Login / Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
