import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Compare from './pages/Compare';
import FeaturedDeals from './pages/FeaturedDeals';
import Favorites from './pages/Favorites';
import Auth from './pages/Auth';
import Chatbot from './components/Chatbot';
import './App.css';

// Protected route — redirect to /auth if not logged in
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
}

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('dishdash_dark') === 'true');

  React.useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('dishdash_dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="dishdash-app" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isAuthenticated && <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}

      <div className="page-content">
        <Routes>
          {/* Public route */}
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/compare" element={<PrivateRoute><Compare /></PrivateRoute>} />
          <Route path="/deals" element={<PrivateRoute><FeaturedDeals /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
        </Routes>
      </div>

      {isAuthenticated && <Chatbot />}

      {isAuthenticated && (
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
              <span style={{ opacity: 0.5, fontSize: '0.9rem' }}>Toing</span>
            </div>
            <p>&copy; 2026 DishDash — Smart Savings for Smart Foodies. Made with ❤️ in Pune.</p>
          </div>
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
