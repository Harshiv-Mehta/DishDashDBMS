"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getCategories = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const getCategories = async (req, res) => {
    try {
        const categories = await product_model_1.default.findAll({
            attributes: [[product_model_1.default.sequelize.fn('DISTINCT', product_model_1.default.sequelize.col('category')), 'category']],
        });
        res.json(categories.map((c) => c.category));
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};
exports.getCategories = getCategories;
const getStats = async (req, res) => {
    try {
        const productCount = await product_model_1.default.count();
        const userCount = await user_model_1.default.count();
        const platformCount = await platform_model_1.default.count();
        res.json({
            totalProducts: productCount,
            activeUsers: userCount,
            platforms: platformCount,
            savings: '25%' // Mocked as it's a display stat
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching stats' });
    }
};
exports.getStats = getStats;
