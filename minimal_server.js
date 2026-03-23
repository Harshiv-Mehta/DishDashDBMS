// CRITICAL: Patch for Node v24.12.0 TracingChannel bug in mysql2
try {
    const dc = require('node:diagnostic_channel');
    const originalSubscribe = dc.subscribe;
    dc.subscribe = function (name, callback) {
        if (name && name.startsWith('mysql2')) return;
        return originalSubscribe.call(this, name, callback);
    };
} catch (e) {
    console.log('Diagnostic channel patch skipped');
}

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 4000,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'test',
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool instead of individual connections
const pool = mysql.createPool(dbConfig);

// Helper: build a highly accurate food image URL from dish name
// Uses source.unsplash.com which searches and returns a relevant photo
function getBetterImage(productName, category, dbImage) {
    // Curated keyword overrides for Indian dishes that need extra specificity
    const KEYWORD_MAP = {
        // Biryani
        'veg biryani': 'vegetable biryani rice indian',
        'mutton biryani': 'mutton biryani indian rice',
        'chicken biryani': 'chicken biryani hyderabadi',
        'chicken dum biryani': 'dum biryani indian layered',
        'hyderabadi chicken biryani': 'hyderabadi biryani spices',
        'saffron biryani': 'saffron rice biryani golden',
        'egg biryani': 'egg biryani indian rice',
        'paneer biryani': 'paneer biryani vegetarian',
        // North Indian
        'butter chicken': 'butter chicken curry indian',
        'paneer makhanwala': 'paneer makhani indian curry',
        'paneer paratha': 'stuffed paratha indian bread',
        'paneer lababdar': 'paneer gravy indian curry',
        'chicken tikka masala': 'chicken tikka masala curry',
        'dal maharaja': 'dal makhani indian lentils',
        'veg kadhai': 'kadhai vegetable indian wok',
        'murg makhani': 'butter chicken murg makhani',
        'paneer tikka masala': 'paneer tikka masala grilled',
        'green curry': 'thai green curry coconut',
        // Pizza
        'margherita pizza': 'margherita pizza fresh basil',
        'pepperoni pizza': 'pepperoni pizza sliced',
        'bbq chicken pizza': 'bbq chicken pizza',
        'farmhouse pizza': 'farmhouse vegetable pizza',
        // Fast Food
        'special vada pav': 'vada pav mumbai street food',
        'spicy vada pav': 'vada pav chutney indian',
        'special burger': 'gourmet burger sesame',
        'special mixed bhel': 'bhel puri indian chaat',
        'pani puri plate': 'pani puri golgappa indian',
        'chicken sandwich': 'grilled chicken sandwich',
        'bun maska': 'bun maska irani cafe',
        'special misal pav': 'misal pav maharashtrian spicy',
        'mango milkshake': 'mango milkshake glass',
        'chicken roll': 'chicken kathi roll wrapped',
        'veg maharaja mac': 'veggie burger mcdonalds',
        // Chinese
        'hakka noodles': 'hakka noodles chinese indian',
        'dimsums platter': 'dim sum steamed dumplings',
        'chicken fried rice': 'chicken fried rice chinese',
        'special ramen': 'ramen noodle soup japanese',
        'poke bowl': 'poke bowl fresh fish',
        'special dumplings': 'steamed dumplings momos',
        'sushi platter': 'sushi platter japanese',
        'special manchurian': 'manchurian indian chinese',
        'veg spring rolls': 'vegetable spring rolls crispy',
        // South Indian
        'mysore masala dosa': 'masala dosa south indian',
        'special idli sambar': 'idli sambar south indian',
        'maharashtrian thali': 'maharashtrian thali plate',
        'special paper dosa': 'paper dosa crispy south indian',
        'special medu vada': 'medu vada south indian',
        'steamed idli': 'idli white steamed',
        'special uttapam': 'uttapam south indian pancake',
        'special masala dosa': 'masala dosa golden crispy',
        'south indian thali': 'south indian meals banana leaf',
        'famous cold coffee': 'cold coffee glass cream',
        // Desserts
        'mawa cake': 'mawa cake indian bakery',
        'mango mastani': 'mango mastani pune drink',
        'gulab jamun': 'gulab jamun indian sweet syrup',
        'kaju katli': 'kaju katli cashew barfi indian',
        'cheesecake': 'cheesecake slice berries',
        'cupcakes': 'cupcakes frosted colorful',
        'chocolate brownie': 'chocolate brownie dessert',
        'macarons': 'french macarons colorful',
        'ice cream': 'ice cream scoop cone',
        'rasgulla plate': 'rasgulla bengali sweet white',
        // Starters
        'paneer tikka': 'paneer tikka grilled skewer',
        'chicken tikka': 'chicken tikka tandoor grilled',
        'reshmi kabab': 'reshmi kebab chicken soft',
        'mutton seekh kabab': 'seekh kebab grilled mutton',
        'galouti kabab': 'galouti kebab lucknowi',
        'loaded nachos': 'loaded nachos cheese jalapeno',
        'hara bhara kabab': 'hara bhara kebab green',
        'sushi': 'sushi rolls japanese fresh',
        'bao': 'bao buns steamed fluffy',
        'paneer sizzler': 'paneer sizzler hot plate',
    };

    // Try to find a curated keyword
    const nameLower = productName.toLowerCase().trim();
    const catLower = category.toLowerCase().trim();

    // 100% robust direct image dictionary
    const IMAGE_LINKS = {
        'gulab jamun': 'https://images.unsplash.com/photo-1628126075677-7429188f62fa?w=800&q=80',
        'biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
        'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
        'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        'dosa': 'https://images.unsplash.com/photo-1668236543047-98667174feaf?w=800&q=80',
        'idli': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80',
        'samosa': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
        'pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
        'noodles': 'https://images.unsplash.com/photo-1612929633738-8fe01f7256e2?w=800&q=80',
        'thali': 'https://images.unsplash.com/photo-1626777552726-4a6b547b4e5d?w=800&q=80',
        'ice cream': 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80',
        'milkshake': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80',
        'roll': 'https://images.unsplash.com/photo-1626804475297-41607ea0f5db?w=800&q=80',
        'cake': 'https://images.unsplash.com/photo-1578985545062-69928b1ea994?w=800&q=80',
        'coffee': 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
        'default': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80'
    };

    // Find the most specific match
    for (const [key, url] of Object.entries(IMAGE_LINKS)) {
        if (key !== 'default' && (nameLower.includes(key) || catLower.includes(key))) {
            return url;
        }
    }

    return IMAGE_LINKS['default'];
}


// ── GET /api/price-comparisons ──────────────────────────────
app.get('/api/price-comparisons', async (req, res) => {
    try {
        const { search, category } = req.query;

        let query = `
      SELECT 
        p.product_id as id,
        p.product_name as name,
        p.category,
        p.image_url as image,
        pl.platform_name as platform_name,
        pc.price as price,
        pc.discount as discount,
        r.redirect_url as link
      FROM products p
      JOIN pricecomparison pc ON p.product_id = pc.product_id
      JOIN platforms pl ON pc.platform_id = pl.platform_id
      LEFT JOIN redirection r ON pc.comparison_id = r.comparison_id
    `;

        const conditions = [];
        const params = [];

        if (search) {
            conditions.push(`(p.product_name LIKE ? OR p.category LIKE ?)`);
            params.push(`%${search}%`, `%${search}%`);
        }
        if (category && category.toLowerCase() !== 'all') {
            conditions.push(`p.category = ?`);
            params.push(category);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(' AND ');
        }

        query += ` ORDER BY p.category, p.product_name`;

        const [rows] = await pool.query(query, params);

        // Grouping by product
        const grouped = rows.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    name: row.name,
                    category: row.category,
                    description: `${row.name} — ${row.category} specialty from top restaurants in Pune.`,
                    image: getBetterImage(row.name, row.category, row.image),
                    platforms: []
                };
            }
            acc[row.id].platforms.push({
                name: row.platform_name,
                price: parseFloat(row.price),
                discount: parseFloat(row.discount),
                link: row.link || `https://www.${row.platform_name.toLowerCase()}.com/search?q=${encodeURIComponent(row.name)}`
            });
            return acc;
        }, {});

        // Mark best deals
        Object.values(grouped).forEach(item => {
            if (item.platforms.length > 0) {
                const minPrice = Math.min(...item.platforms.map(p => p.price));
                item.platforms.forEach(p => {
                    if (p.price === minPrice) p.isBest = true;
                });
            }
        });

        res.json(Object.values(grouped));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ── GET /api/categories ─────────────────────────────────────
app.get('/api/categories', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT DISTINCT category FROM products ORDER BY category`
        );
        res.json(rows.map(r => r.category));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ── GET /api/stats ──────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
    try {
        const [[productCount]] = await pool.query(`SELECT COUNT(*) as cnt FROM products`);
        const [[platformCount]] = await pool.query(`SELECT COUNT(*) as cnt FROM platforms`);
        const [[maxDiscount]] = await pool.query(`SELECT MAX(discount) as maxDisc FROM pricecomparison`);
        res.json({
            totalProducts: productCount.cnt,
            platforms: platformCount.cnt,
            savings: `${maxDiscount.maxDisc}%`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`🍽️  DishDash Server running on http://localhost:${PORT}`);
    console.log(`📡 Database pool initialized with 10 connections`);
});
