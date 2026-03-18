const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixAuth() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD
    });

    try {
        console.log('Updating auth mode...');
        await connection.query("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ppk40313'");
        await connection.query("FLUSH PRIVILEGES");
        console.log('✅ MySQL Authentication mode updated to native_password');
    } catch (err) {
        console.error('❌ Error updating auth mode:', err);
    } finally {
        await connection.end();
    }
}

fixAuth();
