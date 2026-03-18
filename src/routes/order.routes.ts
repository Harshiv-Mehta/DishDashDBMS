import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import auth from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import Joi from 'joi';

const router = Router();

const orderItemSchema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
});

const orderSchema = Joi.object({
    restaurant: Joi.string().required(),
    items: Joi.array().items(orderItemSchema).required(),
    totalPrice: Joi.number().required(),
});

router.route('/')
    .get(auth, orderController.getOrders)
    .post(auth, validate(orderSchema), orderController.createOrder);

router.route('/:id')
    .get(auth, orderController.getOrderById);

router.route('/:id/status')
    .put(auth, orderController.updateOrderStatus);


export default router;
