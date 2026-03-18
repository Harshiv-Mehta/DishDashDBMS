const mysql = require('mysql2/promise');
require('dotenv').config();

async function seedImages() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'food_delivery'
    });

    try {
        const images = {
            1: 'https://images.unsplash.com/photo-1603894584202-747f5255476d?auto=format&fit=crop&q=80&w=800',
            4: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=800',
            8: 'https://images.unsplash.com/photo-1567184109411-47a7a3928501?auto=format&fit=crop&q=80&w=800'
        };

        for (const [id, url] of Object.entries(images)) {
            await connection.query('UPDATE menu_items SET image_url = ? WHERE item_id = ?', [url, id]);
        }
        console.log('✅ Images seeded successfully!');
    } catch (err) {
        console.error('❌ Error seeding images:', err);
    } finally {
        await connection.end();
    }
}

seedImages();
