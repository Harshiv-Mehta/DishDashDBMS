"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.getRestaurants = exports.createRestaurant = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const menuItem_model_1 = __importDefault(require("../models/menuItem.model"));
const createRestaurant = async (restaurantData) => {
    return await restaurant_model_1.default.create(restaurantData);
};
exports.createRestaurant = createRestaurant;
const getRestaurants = async () => {
    return await restaurant_model_1.default.findAll({ include: [menuItem_model_1.default] });
};
exports.getRestaurants = getRestaurants;
const getRestaurantById = async (id) => {
    return await restaurant_model_1.default.findByPk(id, { include: [menuItem_model_1.default] });
};
exports.getRestaurantById = getRestaurantById;
const updateRestaurant = async (id, restaurantData) => {
    const [affectedCount] = await restaurant_model_1.default.update(restaurantData, {
        where: { id },
    });
    if (affectedCount > 0) {
        return await restaurant_model_1.default.findByPk(id, { include: [menuItem_model_1.default] });
    }
    return null;
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (id) => {
    return await restaurant_model_1.default.destroy({
        where: { id },
    });
};
exports.deleteRestaurant = deleteRestaurant;
const addMenuItem = async (restaurantId, menuItem) => {
    const restaurant = await restaurant_model_1.default.findByPk(restaurantId);
    if (restaurant) {
        return await menuItem_model_1.default.create({ ...menuItem, restaurantId });
    }
    return null;
};
exports.addMenuItem = addMenuItem;
const updateMenuItem = async (restaurantId, menuItemId, menuItemData) => {
    const [affectedCount] = await menuItem_model_1.default.update(menuItemData, {
        where: { id: menuItemId, restaurantId },
    });
    if (affectedCount > 0) {
        return await menuItem_model_1.default.findByPk(menuItemId);
    }
    return null;
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (restaurantId, menuItemId) => {
    return await menuItem_model_1.default.destroy({
        where: { id: menuItemId, restaurantId },
    });
};
exports.deleteMenuItem = deleteMenuItem;
