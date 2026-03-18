"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMySQL = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ override: true });
// Exporting the sequelize instance
exports.sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE || 'food_delivery', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || 'ppk40313', {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    dialectOptions: process.env.MYSQL_SSL === 'true' ? {
        ssl: {
            rejectUnauthorized: false
        }
    } : {}
});
// Exporting the connection function
const connectMySQL = async () => {
    try {
        console.log(`Attempting to connect to MySQL at ${process.env.MYSQL_HOST || 'localhost'}...`);
        console.log(`Database: ${process.env.MYSQL_DATABASE || 'food_delivery'}`);
        console.log(`User: ${process.env.MYSQL_USER || 'root'}`);
        await exports.sequelize.authenticate();
        console.log('✅ MySQL Connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};
exports.connectMySQL = connectMySQL;
