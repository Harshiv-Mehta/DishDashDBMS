import React, { useState, useEffect } from 'react';
import './Hero.css';
import { API_BASE_URL } from '../config';

const Hero = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [stats, setStats] = useState({ totalDishes: 30, totalPlatforms: 5, maxDiscount: 30 });

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
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
                    <div className="hero-badge">🔥 Pune's #1 Food Price Comparison</div>
                    <h1>Compare Prices, <span>Savor the Savings</span></h1>
                    <p>Find the best deals on your favorite meals across Swiggy, Zomato, EatSure, Magicpin & Dunzo. Smart eating for the smart Indian household.</p>

                    <div className="search-box glass-card">
                        <input
                            type="text"
                            placeholder="What are you craving today? (e.g. Biryani, Pizza, Dosa)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button className="btn-primary" onClick={handleSearch}>Search Deals</button>
                    </div>

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
                        <span className="floating-emoji">🍕</span>
                        <span>Pizza from ₹180</span>
                    </div>
                    <div className="floating-card floating-card-2 glass-card">
                        <span className="floating-emoji">🍛</span>
                        <span>Save up to 30%</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
