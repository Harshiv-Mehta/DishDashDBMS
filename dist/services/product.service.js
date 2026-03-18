"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = async (productData) => {
    return await product_model_1.default.create(productData);
};
exports.createProduct = createProduct;
const getProducts = async () => {
    return await product_model_1.default.findAll();
};
exports.getProducts = getProducts;
const getProductById = async (id) => {
    return await product_model_1.default.findByPk(id);
};
exports.getProductById = getProductById;
const updateProduct = async (id, productData) => {
    const [affectedCount] = await product_model_1.default.update(productData, {
        where: { id },
    });
    if (affectedCount > 0) {
        return await product_model_1.default.findByPk(id);
    }
    return null;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    return await product_model_1.default.destroy({
        where: { id },
    });
};
exports.deleteProduct = deleteProduct;
