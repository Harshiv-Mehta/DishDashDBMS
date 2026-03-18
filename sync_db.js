const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function sync() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE || 'food_delivery',
        multipleStatements: true
    });

    try {
        console.log('Reading SQL file...');
        const sqlPath = path.join(__dirname, 'dishdash_pune_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Executing SQL statements individually...');
        // Split by semicolon, but handle cases where it might be inside quotes if necessary
        // For this script, a simple split should suffice as long as semicolons aren't in strings
        const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith('--'));

        for (let i = 0; i < statements.length; i++) {
            const stmt = statements[i];
            try {
                // Disable foreign key checks for each statement to be safe
                await connection.query('SET FOREIGN_KEY_CHECKS = 0');
                // console.log(`Executing statement ${i + 1}: ${stmt.substring(0, 50)}...`);
                await connection.query(stmt);
            } catch (err) {
                console.error(`❌ Error executing statement ${i + 1}:`, stmt);
                console.error('Error Details:', err.sqlMessage);
                throw err; // Stop at first error
            }
        }
        await connection.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('✅ Database synced successfully with Pune localized data!');
    } catch (err) {
        console.error('❌ Error syncing database:', err);
    } finally {
        await connection.end();
    }
}

sync();
