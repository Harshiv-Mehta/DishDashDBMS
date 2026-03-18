"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = require("../models/order.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const createOrder = async (orderData) => {
    const { items, ...orderHeader } = orderData;
    const order = await order_model_1.Order.create(orderHeader);
    if (items && items.length > 0) {
        const orderItems = items.map((item) => ({ ...item, orderId: order.id }));
        await order_model_1.OrderItem.bulkCreate(orderItems);
    }
    return (await order_model_1.Order.findByPk(order.id, {
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.default, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    }));
};
exports.createOrder = createOrder;
const getOrders = async () => {
    return await order_model_1.Order.findAll({
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.default, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    });
};
exports.getOrders = getOrders;
const getOrderById = async (id) => {
    return await order_model_1.Order.findByPk(id, {
        include: [
            { model: user_model_1.default, attributes: ['name'] },
            { model: restaurant_model_1.default, attributes: ['name'] },
            { model: order_model_1.OrderItem }
        ]
    });
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (id, status) => {
    const order = await order_model_1.Order.findByPk(id);
    if (order) {
        order.status = status;
        await order.save();
        return (await order_model_1.Order.findByPk(order.id, {
            include: [
                { model: user_model_1.default, attributes: ['name'] },
                { model: restaurant_model_1.default, attributes: ['name'] },
                { model: order_model_1.OrderItem }
            ]
        }));
    }
    return null;
};
exports.updateOrderStatus = updateOrderStatus;
