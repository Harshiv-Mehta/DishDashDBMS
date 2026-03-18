"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePriceComparison = exports.updatePriceComparison = exports.getPriceComparisonById = exports.getPriceComparisons = exports.createPriceComparison = void 0;
const priceComparison_model_1 = __importDefault(require("../models/priceComparison.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const platform_model_1 = __importDefault(require("../models/platform.model"));
const redirection_model_1 = __importDefault(require("../models/redirection.model"));
const sequelize_1 = require("sequelize");
const createPriceComparison = async (priceComparisonData) => {
    return await priceComparison_model_1.default.create(priceComparisonData);
};
exports.createPriceComparison = createPriceComparison;
const getPriceComparisons = async (filters = {}) => {
    const { category, search } = filters;
    const where = {};
    if (category && category !== 'All')
        where.category = category;
    if (search) {
        where[sequelize_1.Op.or] = [
            { product_name: { [sequelize_1.Op.like]: `%${search}%` } },
            { restaurant_name: { [sequelize_1.Op.like]: `%${search}%` } },
            { category: { [sequelize_1.Op.like]: `%${search}%` } }
        ];
    }
    const products = await product_model_1.default.findAll({
        where,
        include: [
            {
                model: priceComparison_model_1.default,
                include: [
                    platform_model_1.default,
                    { model: redirection_model_1.default }
                ]
            }
        ]
    });
    return products.map((item) => {
        const platforms = item.PriceComparisons
            .map((pc) => ({
            name: pc.Platform.platform_name,
            price: parseFloat(pc.price),
            discount: parseFloat(pc.discount),
            link: pc.Redirections && pc.Redirections.length > 0
                ? pc.Redirections[0].redirect_url
                : `https://${pc.Platform.platform_name.toLowerCase()}.com/search?q=${encodeURIComponent(item.product_name)}`,
        }));
        // Identify Best Deal
        if (platforms.length > 0) {
            const minPrice = Math.min(...platforms.map((p) => p.price));
            platforms.forEach((p) => {
                if (p.price === minPrice)
                    p.isBest = true;
            });
        }
        return {
            id: item.product_id,
            name: item.product_name,
            restaurant_name: item.restaurant_name,
            category: item.category,
            description: `${item.product_name} from ${item.restaurant_name}`,
            image: item.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
            platforms: platforms
        };
    });
};
exports.getPriceComparisons = getPriceComparisons;
const getPriceComparisonById = async (id) => {
    return await priceComparison_model_1.default.findByPk(id);
};
exports.getPriceComparisonById = getPriceComparisonById;
const updatePriceComparison = async (id, priceComparisonData) => {
    await priceComparison_model_1.default.update(priceComparisonData, { where: { comparison_id: id } });
    return await priceComparison_model_1.default.findByPk(id);
};
exports.updatePriceComparison = updatePriceComparison;
const deletePriceComparison = async (id) => {
    return await priceComparison_model_1.default.destroy({ where: { comparison_id: id } });
};
exports.deletePriceComparison = deletePriceComparison;
