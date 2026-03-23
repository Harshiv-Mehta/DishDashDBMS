import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Already logged in → go home
    if (isAuthenticated) return <Navigate to="/" replace />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            login(isLogin ? (email.split('@')[0] || 'Foodie') : name, email);
            setLoading(false);
            navigate('/');
        }, 800);
    };

    return (
        <div className="auth-page">
            {/* Left panel – branding */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <div className="auth-logo">
                        Dish<span>Dash</span>
                    </div>
                    <h1>Compare Prices.<br />Savor the Savings.</h1>
                    <p>Find the best deals on your favorite meals across Swiggy, Zomato, EatSure, Magicpin & Toing.</p>
                    <div className="auth-features">
                        <div className="auth-feature-pill">🍽️ 120+ Dishes</div>
                        <div className="auth-feature-pill">💸 Save up to 30%</div>
                        <div className="auth-feature-pill">⚡ Real-time Prices</div>
                    </div>
                </div>
                <div className="auth-left-overlay" />
            </div>

            {/* Right panel – form */}
            <div className="auth-right">
                <div className="auth-form-card">
                    <div className="auth-form-header">
                        <h2>{isLogin ? 'Welcome Back 👋' : 'Join DishDash 🍕'}</h2>
                        <p>{isLogin ? 'Log in to track your savings.' : 'Create an account to get started.'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="auth-field">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Priya Sharma"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                        )}
                        <div className="auth-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="auth-field">
                            <label>Password</label>
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="auth-submit-btn" disabled={loading}>
                            {loading ? '⌛ Please wait...' : (isLogin ? 'Login →' : 'Create Account →')}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? ' Sign up' : ' Log in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
