import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication success
        alert(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);
        navigate('/');
    };

    return (
        <main style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--bg-warm)'
        }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? 'Log in to save your favorite compares.' : 'Join DishDash for smarter savings.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {!isLogin && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Name</label>
                            <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
                        <input type="email" required placeholder="you@example.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Password</label>
                        <input type="password" required placeholder="••••••••" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #ddd' }} />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1rem' }}>
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, marginLeft: '0.5rem', cursor: 'pointer' }}
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Auth;
