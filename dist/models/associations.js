"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("./product.model"));
const price_model_1 = __importDefault(require("./price.model"));
const restaurant_model_1 = __importDefault(require("./restaurant.model"));
const user_model_1 = __importDefault(require("./user.model"));
const order_model_1 = require("./order.model");
const platform_model_1 = __importDefault(require("./platform.model"));
const priceComparison_model_1 = __importDefault(require("./priceComparison.model"));
const redirection_model_1 = __importDefault(require("./redirection.model"));
const favorite_model_1 = __importDefault(require("./favorite.model"));
const searchHistory_model_1 = __importDefault(require("./searchHistory.model"));
const setupAssociations = () => {
    // Product <-> Price
    product_model_1.default.hasMany(price_model_1.default, { foreignKey: 'product_id', as: 'prices' });
    price_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id', as: 'product' });
    // Platform <-> PriceComparison
    platform_model_1.default.hasMany(priceComparison_model_1.default, { foreignKey: 'platform_id' });
    priceComparison_model_1.default.belongsTo(platform_model_1.default, { foreignKey: 'platform_id' });
    // Product <-> PriceComparison
    product_model_1.default.hasMany(priceComparison_model_1.default, { foreignKey: 'product_id' });
    priceComparison_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id' });
    // PriceComparison <-> Redirection
    priceComparison_model_1.default.hasMany(redirection_model_1.default, { foreignKey: 'comparison_id' });
    redirection_model_1.default.belongsTo(priceComparison_model_1.default, { foreignKey: 'comparison_id' });
    // User <-> Order
    user_model_1.default.hasMany(order_model_1.Order, { foreignKey: 'user_id' });
    order_model_1.Order.belongsTo(user_model_1.default, { foreignKey: 'user_id' });
    // User <-> Favorite
    user_model_1.default.hasMany(favorite_model_1.default, { foreignKey: 'user_id' });
    favorite_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'user_id' });
    // Product <-> Favorite
    product_model_1.default.hasMany(favorite_model_1.default, { foreignKey: 'product_id' });
    favorite_model_1.default.belongsTo(product_model_1.default, { foreignKey: 'product_id' });
    // User <-> SearchHistory
    user_model_1.default.hasMany(searchHistory_model_1.default, { foreignKey: 'user_id' });
    searchHistory_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'user_id' });
    // Restaurant <-> Order
    restaurant_model_1.default.hasMany(order_model_1.Order, { foreignKey: 'restaurantId' });
    order_model_1.Order.belongsTo(restaurant_model_1.default, { foreignKey: 'restaurantId' });
    // Order <-> OrderItem
    order_model_1.Order.hasMany(order_model_1.OrderItem, { foreignKey: 'orderId' });
    order_model_1.OrderItem.belongsTo(order_model_1.Order, { foreignKey: 'orderId' });
};
exports.default = setupAssociations;
