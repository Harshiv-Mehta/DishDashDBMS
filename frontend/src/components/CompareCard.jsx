import React from 'react';
import './CompareCard.css';

// Reliable platform logo URLs
const PLATFORM_LOGOS = {
    'Swiggy': 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
    'Zomato': 'https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png',
    'EatSure': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/EatSure_Logo.png/220px-EatSure_Logo.png',
    'Magicpin': 'https://play-lh.googleusercontent.com/GJmBBb-IHxFRKVHu5NpVNBDhWXkxfRFePkVLvBnSCGxXhDRPBiJYMzhTA9KKEA_hKw',
    'Toing': 'https://ui-avatars.com/api/?name=Toing&background=E91E63&color=fff&rounded=true'
};

// Platform brand colors
const PLATFORM_COLORS = {
    'Swiggy': '#FC8019',
    'Zomato': '#E23744',
    'EatSure': '#5D3FD3',
    'Magicpin': '#FF3366',
    'Toing': '#E91E63'
};

const CompareCard = ({ dish }) => {
    const { id, name, image, description, platforms, category } = dish;

    const getFrontendImage = (dishName) => {
        const exactMap = {
            // Biryani (1-15)
            'veg biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
            'mutton biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
            'chicken biryani': 'https://images.unsplash.com/photo-1631515223360-5d92d765ee13?w=800&q=80',
            'sajuk tup mutton biryani': 'https://images.unsplash.com/photo-1543353071-087092ec393a?w=800&q=80',
            'chicken dum biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
            'mutton thali biryani': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
            'hyderabadi chicken biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
            'saffron biryani': 'https://images.unsplash.com/photo-1542367592-8849f515ee0b?w=800&q=80',
            'egg biryani': 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=800&q=80',
            'zaikedaar chicken biryani': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80',
            'paneer biryani': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
            'special mutton biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',

            // North Indian (16-30)
            'butter chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b0ae398?w=800&q=80',
            'paneer makhanwala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
            'thali special bhaji': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
            'paneer paratha': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'paneer lababdar': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
            'chicken tikka masala': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
            'dal maharaja': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
            'veg kadhai': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',
            'curry bowl': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
            'murg makhani': 'https://images.unsplash.com/photo-1603894584373-5ac82b0ae398?w=800&q=80',
            'special dal': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
            'veg platter': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
            'green curry': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',
            'veg masala': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',

            // Pizza (31-45)
            'margherita pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800&q=80',
            'gourmet pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'bbq chicken pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'pepperoni pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
            'veg delight pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'chicken supreme pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'special pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800&q=80',
            'classic pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
            'paneer pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'chicken pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
            'veggie feast pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'meaty feast pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
            'maharaja pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'pan pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?w=800&q=80',
            'farmhouse pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',

            // Fast Food (46-60)
            'special vada pav': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'spicy vada pav': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'special burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            'chicken burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            'special mixed bhel': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
            'pani puri plate': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
            'chicken sandwich': 'https://images.unsplash.com/photo-1616075908027-f41e548f070f?w=800&q=80',
            'bun maska': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
            'special misal pav': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'spicy misal pav': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'special misal': 'https://images.unsplash.com/photo-1606491956689-2ea8c5119c8c?w=800&q=80',
            'mango milkshake': 'https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?w=800&q=80',
            'chicken roll': 'https://images.unsplash.com/photo-1626804475297-41607ea0f5db?w=800&q=80',
            'special roll': 'https://images.unsplash.com/photo-1626804475297-41607ea0f5db?w=800&q=80',
            'veg maharaja mac': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            'shiv kailash lassi': 'https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?w=800&q=80',

            // Chinese (61-75)
            'hakka noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',
            'dimsums platter': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
            'chicken fried rice': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80',
            'pan asian stir fry': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
            'special ramen': 'https://images.unsplash.com/photo-1552611052-33e04de081de?w=800&q=80',
            'poke bowl': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
            'special dumplings': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
            'special tempura': 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=800&q=80',
            'sushi platter': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
            'special manchurian': 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
            'oriental stir fry': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
            'asian wings': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
            'pan asian': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
            'veg spring rolls': 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
            'chicken noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80',

            // South Indian (76-90)
            'mysore masala dosa': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',
            'special idli sambar': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
            'special podi idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
            'maharashtrian thali': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
            'special paper dosa': 'https://images.unsplash.com/photo-1630409351241-e90e765e74c9?w=800&q=80',
            'special medu vada': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
            'steamed idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
            'special bisibelebath': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
            'benne dosa special': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',
            'famous cold coffee': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
            'south indian thali': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
            'special uttapam': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',
            'special masala dosa': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',

            // Desserts (91-105)
            'gulab jamun': 'https://images.unsplash.com/photo-1628126075677-7429188f62fa?w=800&q=80',
            'mawa cake': 'https://images.unsplash.com/photo-1578985545062-69928b1ea994?w=800&q=80',
            'mango mastani': 'https://images.unsplash.com/photo-1571115177098-24ec42ed2bb4?w=800&q=80',
            'ginger biscuits': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
            'kaju katli': 'https://images.unsplash.com/photo-1624311867156-6548a313669f?w=800&q=80',
            'special puffs': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
            'cheesecake': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
            'cupcakes': 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80',
            'chocolate brownie': 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80',
            'special tart': 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80',
            'organic desserts': 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
            'artisan pastries': 'https://images.unsplash.com/photo-1509365465994-3e5063450912?w=800&q=80',
            'macarons': 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&q=80',
            'ice cream': 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80',
            'rasgulla plate': 'https://images.unsplash.com/photo-1628126075677-7429188f62fa?w=800&q=80',

            // Starters (106-120)
            'paneer tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
            'chicken tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
            'reshmi kabab': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',
            'mutton seekh kabab': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80',
            'galouti kabab': 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
            'lotus stem': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
            'wings': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
            'loaded nachos': 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80',
            'mezze platter': 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=800&q=80',
            'hara bhara kabab': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
            'special galouti': 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
            'special starters': 'https://images.unsplash.com/photo-1542528180-1c2803fa048c?w=800&q=80',
            'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
            'bao': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80',
            'paneer sizzler': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80'
        };

        const lname = dishName.toLowerCase().trim();
        // Return exact match if exists
        if (exactMap[lname]) return exactMap[lname];
        
        // Return fuzzy category match
        const keywords = ['biryani', 'pizza', 'burger', 'dosa', 'samosa', 'pasta', 'noodles', 'thali', 'ice cream', 'milkshake', 'roll', 'cake', 'coffee'];
        const fuzzyMap = {
            'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
            'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
            'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            'dosa': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',
            'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
            'pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
            'noodles': 'https://images.unsplash.com/photo-1612929633738-8fe01f7256e2?w=800&q=80',
            'thali': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80',
            'ice cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80',
            'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
            'roll': 'https://images.unsplash.com/photo-1626804475297-41607ea0f5db?w=800&q=80',
            'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1ea994?w=800&q=80',
            'coffee': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80'
        };

        for (let kw of keywords) {
            if (lname.includes(kw)) return fuzzyMap[kw];
        }

        // Return provided db fallback or ultimate default
        return image || 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80';
    };

    const calculatedImgSrc = getFrontendImage(name);
    const [imageError, setImageError] = React.useState(false);

    React.useEffect(() => {
        setImageError(false);
    }, [name, image]);

    const handleImageError = () => {
        setImageError(true);
    };

    const imgSrc = imageError ? 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80' : calculatedImgSrc;

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
                    onLoad={(e) => e.target.classList.add('loaded')}
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
