import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CompareCard from '../components/CompareCard';
import { API_BASE_URL } from '../config';

const SORT_OPTIONS = [
    { value: 'default', label: '🔀 Default' },
    { value: 'price-low', label: '💰 Price: Low → High' },
    { value: 'price-high', label: '💸 Price: High → Low' },
    { value: 'discount', label: '🔥 Highest Discount' },
    { value: 'savings', label: '💎 Most Savings' },
];

const Home = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const [showSurprise, setShowSurprise] = useState(false);
    const [surpriseDish, setSurpriseDish] = useState(null);
    const ITEMS_PER_PAGE = 6;

    // Fetch categories on mount
    useEffect(() => {
        fetch(`${API_BASE_URL}/api/categories`)
            .then(res => res.json())
            .then(data => setCategories(['All', ...data]))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const fetchDishes = (searchQuery = '', category = '') => {
        setLoading(true);
        let url = `${API_BASE_URL}/api/price-comparisons`;
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (category && category !== 'All') params.append('category', category);
        if (params.toString()) url += `?${params.toString()}`;

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch data');
                return res.json();
            })
            .then(data => {
                setDishes(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching dishes:', err);
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchDishes('', activeCategory);
    }, [activeCategory]);

    const handleSearch = (query) => {
        setActiveCategory('All');
        fetchDishes(query);
    };

    const handleCategoryClick = (cat) => {
        setActiveCategory(cat);
        setCurrentPage(1); // Reset to page 1 on category change
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentPage(1); // Reset to page 1 on sort change
    };

    const pickRandomDish = () => {
        if (sortedDishes.length > 0) {
            const randomIndex = Math.floor(Math.random() * sortedDishes.length);
            setSurpriseDish(sortedDishes[randomIndex]);
            setShowSurprise(true);
        }
    };

    // Sort dishes
    const sortedDishes = [...dishes].sort((a, b) => {
        const bestA = Math.min(...a.platforms.map(p => p.price));
        const bestB = Math.min(...b.platforms.map(p => p.price));
        const maxDiscA = Math.max(...a.platforms.map(p => p.discount || 0));
        const maxDiscB = Math.max(...b.platforms.map(p => p.discount || 0));
        const savingsA = Math.max(...a.platforms.map(p => p.price)) - bestA;
        const savingsB = Math.max(...b.platforms.map(p => p.price)) - bestB;

        switch (sortBy) {
            case 'price-low': return bestA - bestB;
            case 'price-high': return bestB - bestA;
            case 'discount': return maxDiscB - maxDiscA;
            case 'savings': return savingsB - savingsA;
            default: return 0;
        }
    });

    return (
        <>
            <Hero onSearch={handleSearch} />

            <main className="container">
                <div className="section-header">
                    <h2>Popular Comparisons</h2>
                    <p>Find the best value for your favorite dishes across 5 platforms.</p>
                </div>

                {/* ── Category Filter Tabs ── */}
                <div className="category-tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat === 'All' ? '🍽️ All' :
                                cat === 'Biryani' ? '🍚 Biryani' :
                                    cat === 'North Indian' ? '🍛 North Indian' :
                                        cat === 'Pizza' ? '🍕 Pizza' :
                                            cat === 'Fast Food' ? '🍔 Fast Food' :
                                                cat === 'Chinese' ? '🥡 Chinese' :
                                                    cat === 'South Indian' ? '🫓 South Indian' :
                                                        cat === 'Desserts' ? '🍰 Desserts' :
                                                            cat === 'Starter' ? '🥘 Starters' :
                                                                cat}
                        </button>
                    ))}
                </div>

                {/* ── Sort + Results Bar ── */}
                {!loading && dishes.length > 0 && (
                    <div className="sort-bar">
                        <span className="results-count-inline">
                            Showing <strong>{dishes.length}</strong> dishes {activeCategory !== 'All' ? `in ${activeCategory}` : ''}
                        </span>

                        <button className="btn-surprise" onClick={pickRandomDish}>
                            🎲 Surprise Me!
                        </button>

                        <div className="sort-select-wrapper">
                            <label>Sort by:</label>
                            <select value={sortBy} onChange={handleSortChange} className="sort-select">
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="dish-grid">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-image shimmer"></div>
                                <div className="skeleton-content">
                                    <div className="skeleton-title shimmer"></div>
                                    <div className="skeleton-text shimmer"></div>
                                    <div className="skeleton-row shimmer"></div>
                                    <div className="skeleton-row shimmer"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>Oops! Something went wrong: {error}</p>
                    </div>
                ) : sortedDishes.length > 0 ? (
                    <>
                        <div className="dish-grid">
                            {sortedDishes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((dish) => (
                                <CompareCard key={dish.id} dish={dish} />
                            ))}
                        </div>

                        {/* ── Pagination Controls ── */}
                        {sortedDishes.length > ITEMS_PER_PAGE && (
                            <div className="pagination">
                                <button
                                    className="page-btn"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                >
                                    ← Prev
                                </button>

                                <span className="page-info">
                                    Page {currentPage} of {Math.ceil(sortedDishes.length / ITEMS_PER_PAGE)}
                                </span>

                                <button
                                    className="page-btn"
                                    disabled={currentPage === Math.ceil(sortedDishes.length / ITEMS_PER_PAGE)}
                                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(sortedDishes.length / ITEMS_PER_PAGE), p + 1))}
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="empty-state">
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <p>No dishes found. Try a different category or search term!</p>
                    </div>
                )}

                {/* ── Surprise Modal ── */}
                {showSurprise && surpriseDish && (
                    <div className="modal-overlay" onClick={() => setShowSurprise(false)}>
                        <div className="modal-content glass-card" onClick={e => e.stopPropagation()}>
                            <button className="close-modal" onClick={() => setShowSurprise(false)}>✕</button>
                            <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>🎉 We Picked For You!</h2>
                            <CompareCard dish={surpriseDish} />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Home;
