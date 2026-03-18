import React from 'react';
import './CompareCard.css';

// Reliable platform logo URLs
const PLATFORM_LOGOS = {
    'Swiggy': 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
    'Zomato': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png',
    'EatSure': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/EatSure_Logo.png/220px-EatSure_Logo.png',
    'Magicpin': 'https://play-lh.googleusercontent.com/GJmBBb-IHxFRKVHu5NpVNBDhWXkxfRFePkVLvBnSCGxXhDRPBiJYMzhTA9KKEA_hKw',
    'Dunzo': 'https://play-lh.googleusercontent.com/H1E6KkJ7cEuxqxXhSPFdjgfCYkbY5fOeXfijVk0bSOHy0VOQxE0Z9NjQIfl-JE0pJQ'
};

// Platform brand colors
const PLATFORM_COLORS = {
    'Swiggy': '#FC8019',
    'Zomato': '#E23744',
    'EatSure': '#5D3FD3',
    'Magicpin': '#FF3366',
    'Dunzo': '#00D290'
};

const CompareCard = ({ dish }) => {
    const { id, name, image, description, platforms, category } = dish;

    // Use loremflickr for highly reliable generic food images if the DB image is broken
    const [imgSrc, setImgSrc] = React.useState(image);

    const handleImageError = () => {
        // Fallback sequence: try loremflickr first, then placehold.co
        if (imgSrc === image) {
            setImgSrc(`https://loremflickr.com/600/400/dish,food/all?random=${id}`);
        } else if (imgSrc.includes('loremflickr')) {
            setImgSrc(`https://placehold.co/600x400/FDF3E7/E67E22?text=${encodeURIComponent(name)}`);
        }
    };

    // Find the best price
    const bestPrice = Math.min(...platforms.map(p => p.price));
    const worstPrice = Math.max(...platforms.map(p => p.price));
    const totalSavings = worstPrice - bestPrice;

    // Favorites logic
    const [isFav, setIsFav] = React.useState(() => {
        const favs = JSON.parse(localStorage.getItem('dishdash_favorites') || '[]');
        return favs.includes(id);
    });

    const toggleFavorite = (e) => {
        e.stopPropagation();
        const favs = JSON.parse(localStorage.getItem('dishdash_favorites') || '[]');
        let newFavs;
        if (favs.includes(id)) {
            newFavs = favs.filter(f => f !== id);
        } else {
            newFavs = [...favs, id];
        }
        localStorage.setItem('dishdash_favorites', JSON.stringify(newFavs));
        setIsFav(!isFav);
    };

    return (
        <div className="compare-card glass-card">
            <div className="card-image">
                <img
                    src={imgSrc}
                    alt={name}
                    loading="lazy"
                    onError={handleImageError}
                />
                <div className="best-deal-badge">Best: ₹{bestPrice}</div>
                {category && <div className="category-badge">{category}</div>}
                {totalSavings > 0 && (
                    <div className="savings-badge">Save upto ₹{totalSavings}</div>
                )}
                <button className={`fav-btn ${isFav ? 'fav-active' : ''}`} onClick={toggleFavorite}>
                    {isFav ? '❤️' : '🤍'}
                </button>
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p className="description">{description}</p>

                <div className="platform-list">
                    {platforms.map((platform, idx) => (
                        <div key={idx} className={`platform-row ${platform.isBest ? 'highlight' : ''}`}>
                            <div className="platform-info">
                                <div
                                    className="platform-logo-wrapper"
                                    style={{
                                        background: PLATFORM_COLORS[platform.name] || '#666',
                                    }}
                                >
                                    <img
                                        src={PLATFORM_LOGOS[platform.name] || ''}
                                        alt={platform.name}
                                        className="platform-logo"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `<span class="logo-fallback">${platform.name.charAt(0)}</span>`;
                                        }}
                                    />
                                </div>
                                <span className="platform-name">{platform.name}</span>
                            </div>
                            <div className="price-info">
                                <span className="platform-price">₹{platform.price}</span>
                                {platform.discount > 0 && <span className="discount-tag">-{platform.discount}% OFF</span>}
                            </div>
                            <a href={platform.link} target="_blank" rel="noopener noreferrer" className="btn-order">
                                Order →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompareCard;
