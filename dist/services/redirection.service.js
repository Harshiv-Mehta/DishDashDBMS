"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRedirection = exports.updateRedirection = exports.getRedirectionById = exports.getRedirections = exports.createRedirection = void 0;
const redirection_model_1 = __importDefault(require("../models/redirection.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const priceComparison_model_1 = __importDefault(require("../models/priceComparison.model"));
const createRedirection = async (redirectionData) => {
    return await redirection_model_1.default.create(redirectionData);
};
exports.createRedirection = createRedirection;
const getRedirections = async () => {
    return await redirection_model_1.default.findAll({
        include: [product_model_1.default, priceComparison_model_1.default]
    });
};
exports.getRedirections = getRedirections;
const getRedirectionById = async (id) => {
    return await redirection_model_1.default.findByPk(id, {
        include: [product_model_1.default, priceComparison_model_1.default]
    });
};
exports.getRedirectionById = getRedirectionById;
const updateRedirection = async (id, redirectionData) => {
    const [affectedCount] = await redirection_model_1.default.update(redirectionData, {
        where: { id },
    });
    if (affectedCount > 0) {
        return await redirection_model_1.default.findByPk(id, { include: [product_model_1.default, priceComparison_model_1.default] });
    }
    return null;
};
exports.updateRedirection = updateRedirection;
const deleteRedirection = async (id) => {
    return await redirection_model_1.default.destroy({
        where: { id },
    });
};
exports.deleteRedirection = deleteRedirection;
