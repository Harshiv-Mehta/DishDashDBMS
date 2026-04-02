import React, { useState, useEffect } from 'react';
import './Hero.css';
import { API_BASE_URL } from '../config';

const Hero = ({ onSearch, recentSearches = [] }) => {
    const [query, setQuery] = useState('');
    const [stats, setStats] = useState({ totalProducts: 120, platforms: 4, savings: '30%' });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/stats`)
            .then(res => res.json())
            .then(data => {
                setStats({
                    totalProducts: data.totalProducts || data.totalDishes || 120,
                    platforms: data.platforms || data.totalPlatforms || 4,
                    savings: data.savings || (data.maxDiscount ? `${data.maxDiscount}%` : '30%')
                });
            })
            .catch(() => { });
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-text">
                    <div className="hero-badge">Pune's food price comparison hub</div>
                    <h1>Compare Prices, <span>Savor the Savings</span></h1>
                    <p>Find the best deals on your favorite meals across Swiggy, Zomato, EatSure, Magicpin and Toing. Searches and favorites are now stored in the database.</p>

                    <div className="search-box glass-card">
                        <input
                            type="text"
                            placeholder="What are you craving today?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button className="btn-primary" onClick={handleSearch}>Search Deals</button>
                    </div>

                    {recentSearches.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            {recentSearches.map(term => (
                                <button
                                    key={term}
                                    type="button"
                                    className="glass-card"
                                    style={{ padding: '0.45rem 0.9rem', border: 'none', cursor: 'pointer' }}
                                    onClick={() => {
                                        setQuery(term);
                                        onSearch?.(term);
                                    }}
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="hero-stats">
                        <div className="stat">
                            <span className="count">{(stats.totalProducts || 0)}+</span>
                            <span className="label">Dishes</span>
                        </div>
                        <div className="stat">
                            <span className="divider"></span>
                        </div>
                        <div className="stat">
                            <span className="count">{(stats.platforms || 0)}</span>
                            <span className="label">Platforms</span>
                        </div>
                        <div className="stat">
                            <span className="divider"></span>
                        </div>
                        <div className="stat">
                            <span className="count">Up to {stats.savings || '0%'}</span>
                            <span className="label">Savings</span>
                        </div>
                    </div>
                </div>
                <div className="hero-image">
                    <div className="image-placeholder glass-card">
                        <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Delicious Food Spread" />
                    </div>
                    <div className="floating-card floating-card-1 glass-card">
                        <span className="floating-emoji">Pizza</span>
                        <span>Pizza from Rs 180</span>
                    </div>
                    <div className="floating-card floating-card-2 glass-card">
                        <span className="floating-emoji">Saved</span>
                        <span>Search history stays synced</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
