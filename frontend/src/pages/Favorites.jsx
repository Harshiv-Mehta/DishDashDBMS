import React, { useState, useEffect } from 'react';
import CompareCard from '../components/CompareCard';
import { API_BASE_URL } from '../config';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [allDishes, setAllDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load favorites from localStorage
        const savedFavs = JSON.parse(localStorage.getItem('dishdash_favorites') || '[]');
        setFavorites(savedFavs);

        // Fetch all dishes
        fetch(`${API_BASE_URL}/api/price-comparisons`)
            .then(res => res.json())
            .then(data => {
                setAllDishes(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const favDishes = allDishes.filter(d => favorites.includes(d.id));

    return (
        <main className="container" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>❤️ My Favorites</h2>
                <p>Your saved dishes for quick access. Click the heart on any card to add to favorites!</p>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Loading your favorites...</p>
                </div>
            ) : favDishes.length > 0 ? (
                <div className="dish-grid">
                    {favDishes.map(dish => (
                        <CompareCard key={dish.id} dish={dish} />
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'var(--text-muted)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💔</div>
                    <h3 style={{ marginBottom: '0.5rem', color: 'var(--secondary)' }}>No favorites yet!</h3>
                    <p>Browse dishes from the Home page and click the ❤️ button to add them here.</p>
                </div>
            )}
        </main>
    );
};

export default Favorites;
