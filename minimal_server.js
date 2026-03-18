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
    }
};

// ── GET /api/price-comparisons ──────────────────────────────
// Supports ?search=keyword and ?category=categoryName
app.get('/api/price-comparisons', async (req, res) => {
    try {
        const { search, category } = req.query;
        const connection = await mysql.createConnection(dbConfig);

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

        const [rows] = await connection.query(query, params);

        // Grouping by product
        const grouped = rows.reduce((acc, row) => {
            if (!acc[row.id]) {
                acc[row.id] = {
                    id: row.id,
                    name: row.name,
                    category: row.category,
                    description: `${row.name} — ${row.category} specialty from top restaurants in Pune.`,
                    image: row.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
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

        await connection.end();
        res.json(Object.values(grouped));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ── GET /api/categories ─────────────────────────────────────
app.get('/api/categories', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query(
            `SELECT DISTINCT category FROM products ORDER BY category`
        );
        await connection.end();
        res.json(rows.map(r => r.category));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// ── GET /api/stats ──────────────────────────────────────────
app.get('/api/stats', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [[productCount]] = await connection.query(`SELECT COUNT(*) as cnt FROM products`);
        const [[platformCount]] = await connection.query(`SELECT COUNT(*) as cnt FROM platforms`);
        const [[maxDiscount]] = await connection.query(`SELECT MAX(discount) as maxDisc FROM pricecomparison`);
        await connection.end();
        res.json({
            totalDishes: productCount.cnt,
            totalPlatforms: platformCount.cnt,
            maxDiscount: maxDiscount.maxDisc
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5006;
app.listen(PORT, () => {
    console.log(`🍽️  DishDash Server running on http://localhost:${PORT}`);
});
