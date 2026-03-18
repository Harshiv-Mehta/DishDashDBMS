import React, { useState, useEffect } from 'react';
import CompareCard from '../components/CompareCard';
import { API_BASE_URL } from '../config';

const FeaturedDeals = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/api/price-comparisons`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then(data => {
                // Determine max discount for each dish and sort descending
                const deals = data.map(dish => {
                    const maxDiscount = Math.max(...dish.platforms.map(p => p.discount || 0));
                    const bestPrice = Math.min(...dish.platforms.map(p => p.price));
                    const worstPrice = Math.max(...dish.platforms.map(p => p.price));
                    return { ...dish, maxDiscount, savings: worstPrice - bestPrice };
                }).filter(dish => dish.maxDiscount > 0)
                    .sort((a, b) => b.maxDiscount - a.maxDiscount);

                setDishes(deals);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Calculate total possible savings
    const totalSavings = dishes.reduce((sum, d) => sum + d.savings, 0);

    return (
        <main className="container" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ color: '#E67E22' }}>🔥 Featured Deals</h2>
                <p>The highest discounts currently available across all platforms in Pune.</p>
            </div>

            {!loading && dishes.length > 0 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '3rem',
                    flexWrap: 'wrap'
                }}>
                    <div className="glass-card" style={{ padding: '1.2rem 2rem', textAlign: 'center', minWidth: '150px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#E67E22' }}>{dishes.length}</div>
                        <div style={{ fontSize: '0.85rem', color: '#636E72', fontWeight: 500 }}>Active Deals</div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.2rem 2rem', textAlign: 'center', minWidth: '150px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#27ae60' }}>₹{totalSavings}</div>
                        <div style={{ fontSize: '0.85rem', color: '#636E72', fontWeight: 500 }}>Total Savings</div>
                    </div>
                    <div className="glass-card" style={{ padding: '1.2rem 2rem', textAlign: 'center', minWidth: '150px' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#E74C3C' }}>{dishes[0]?.maxDiscount}%</div>
                        <div style={{ fontSize: '0.85rem', color: '#636E72', fontWeight: 500 }}>Top Discount</div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Fetching the hottest deals...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>Oops! Something went wrong: {error}</p>
                </div>
            ) : dishes.length > 0 ? (
                <div className="dish-grid">
                    {dishes.map((dish) => (
                        <CompareCard key={dish.id} dish={dish} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                    <p>No special deals available at the moment. Check back later!</p>
                </div>
            )}
        </main>
    );
};

export default FeaturedDeals;
