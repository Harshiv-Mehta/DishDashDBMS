import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compare from './pages/Compare';
import FeaturedDeals from './pages/FeaturedDeals';
import Favorites from './pages/Favorites';
import Auth from './pages/Auth';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('dishdash_dark') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('dishdash_dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="dishdash-app" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/deals" element={<FeaturedDeals />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>

        <Chatbot />

        <footer className="footer" style={{ marginTop: 'auto' }}>
          <div className="container">
            <div style={{ marginBottom: '1rem' }}>
              <span className="logo" style={{ fontSize: '1.5rem', color: 'white' }}>Dish<span style={{ color: 'var(--primary)' }}>Dash</span></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Swiggy</span>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Zomato</span>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>EatSure</span>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Magicpin</span>
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Dunzo</span>
            </div>
            <p>&copy; 2026 DishDash — Smart Savings for Smart Foodies. Made with ❤️ in Pune.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
