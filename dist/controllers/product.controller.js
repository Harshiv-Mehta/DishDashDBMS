"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const scraper_service_1 = require("../services/scraper.service");
const price_model_1 = __importDefault(require("../models/price.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const getProducts = async (req, res, next) => {
    try {
        const products = await product_model_1.default.findAll();
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res, next) => {
    try {
        const product = await product_model_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getProductById = async (req, res, next) => {
    try {
        const product = await product_model_1.default.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res, next) => {
    try {
        const [updated] = await product_model_1.default.update(req.body, {
            where: { product_id: req.params.id },
        });
        if (updated) {
            const updatedProduct = await product_model_1.default.findByPk(req.params.id);
            return res.json(updatedProduct);
        }
        res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await product_model_1.default.destroy({
            where: { product_id: req.params.id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        res.status(404).json({ message: 'Product not found' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
const searchProduct = async (req, res, next) => {
    const { productName } = req.body;
    if (!productName) {
        return res.status(400).json({ message: 'Product name is required.' });
    }
    try {
        // Find or create the product
        const [product] = await product_model_1.default.findOrCreate({
            where: { product_name: productName },
            defaults: { product_name: productName }, // Add other defaults like description, imageUrl if applicable
        });
        // Fetch prices from the scraper service
        const fetchedPrices = await (0, scraper_service_1.fetchPrices)(productName);
        // Save fetched prices to the database
        const createdPrices = await Promise.all(fetchedPrices.map((item) => price_model_1.default.create({
            product_id: product.product_id,
            platform: item.platform,
            price: item.price,
            timestamp: new Date(),
        })));
        res.status(201).json(createdPrices);
    }
    catch (error) {
        console.error('Error in searchProduct:', error);
        if (error.message.includes('Scraper Unavailable')) {
            return res.status(503).json({ message: error.message });
        }
        next(error);
    }
};
exports.searchProduct = searchProduct;
