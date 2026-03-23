const mysql = require('mysql2/promise');
require('dotenv').config();

async function addPavBhaji() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log('Adding Pav Bhaji to the database...');
        
        // 1. Insert into products
        await connection.query(`
            INSERT IGNORE INTO products (product_id, product_name, restaurant_name, category, image_url)
            VALUES (121, 'Special Pav Bhaji', 'Siddharth Pav Bhaji', 'Fast Food', NULL)
        `);

        // 2. Insert into platforms and pricecomparison (IDs 1-5 for platforms)
        // Let's assume comparisons 601-605
        const platforms = [1, 2, 3, 4, 5];
        for (let i = 0; i < platforms.length; i++) {
            const comparisonId = 601 + i;
            await connection.query(`
                INSERT IGNORE INTO pricecomparison (comparison_id, product_id, platform_id, price, discount)
                VALUES (?, 121, ?, ?, ?)
            `, [comparisonId, platforms[i], 120 + i * 5, 10 + i]);

            // 3. Insert into redirection
            await connection.query(`
                INSERT IGNORE INTO redirection (redirect_id, comparison_id, redirect_url)
                VALUES (?, ?, ?)
            `, [comparisonId, comparisonId, `https://www.swiggy.com/search?query=pav+bhaji`]);
        }

        console.log('✅ Pav Bhaji added successfully!');
    } catch (err) {
        console.error('❌ Error adding Pav Bhaji:', err.message);
    } finally {
        await connection.end();
    }
}

addPavBhaji();
