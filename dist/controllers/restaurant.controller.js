"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.deleteRestaurant = exports.updateRestaurant = exports.getRestaurantById = exports.getRestaurants = exports.createRestaurant = void 0;
const restaurantService = __importStar(require("../services/restaurant.service"));
const createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.createRestaurant(req.body);
        res.status(201).json(restaurant);
    }
    catch (error) {
        next(error);
    }
};
exports.createRestaurant = createRestaurant;
const getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await restaurantService.getRestaurants();
        res.json(restaurants);
    }
    catch (error) {
        next(error);
    }
};
exports.getRestaurants = getRestaurants;
const getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(Number(req.params.id));
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getRestaurantById = getRestaurantById;
const updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.updateRestaurant(Number(req.params.id), req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.deleteRestaurant(Number(req.params.id));
        if (restaurant) {
            res.json({ message: 'Restaurant deleted' });
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRestaurant = deleteRestaurant;
const addMenuItem = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.addMenuItem(Number(req.params.id), req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.addMenuItem = addMenuItem;
const updateMenuItem = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.updateMenuItem(Number(req.params.id), Number(req.params.itemId), req.body);
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant or menu item not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.deleteMenuItem(Number(req.params.id), Number(req.params.itemId));
        if (restaurant) {
            res.json(restaurant);
        }
        else {
            res.status(404).json({ message: 'Restaurant or menu item not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMenuItem = deleteMenuItem;
