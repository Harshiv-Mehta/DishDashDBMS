import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CompareCard from '../components/CompareCard';
import { API_BASE_URL } from '../config';

const Compare = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState(query);

    const fetchDishes = (searchQuery) => {
        if (!searchQuery) {
            setDishes([]);
            return;
        }
        setLoading(true);
        fetch(`${API_BASE_URL}/api/price-comparisons?search=${encodeURIComponent(searchQuery)}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then(data => {
                setDishes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (query) {
            fetchDishes(query);
        } else {
            setDishes([]);
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ q: searchInput.trim() });
        } else {
            setSearchParams({});
        }
    };

    return (
        <main className="container" style={{ minHeight: '80vh', paddingTop: '4rem' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2>Compare Prices</h2>
                <p>Search for specific dishes or restaurants to find the best deals.</p>

                <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '2rem auto', display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search for Biryani, Pizza..."
                        style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '50px', border: '1px solid #ddd', fontSize: '1rem' }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '0 2rem' }}>Search</button>
                </form>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="loader"></div>
                    <p>Searching across platforms...</p>
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
            ) : query ? (
                <div style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
                    <p>No results found for "{query}". Try another search term.</p>
                </div>
            ) : null}
        </main>
    );
};

export default Compare;
