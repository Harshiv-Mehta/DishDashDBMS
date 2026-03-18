import { Router } from 'express';
import * as restaurantController from '../controllers/restaurant.controller';
import auth from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import Joi from 'joi';

const router = Router();

const restaurantSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    cuisine: Joi.string().required(),
});

const menuItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
});

router.route('/')
    .get(restaurantController.getRestaurants)
    .post(auth, validate(restaurantSchema), restaurantController.createRestaurant);

router.route('/:id')
    .get(restaurantController.getRestaurantById)
    .put(auth, validate(restaurantSchema), restaurantController.updateRestaurant)
    .delete(auth, restaurantController.deleteRestaurant);

router.route('/:id/menu')
    .post(auth, validate(menuItemSchema), restaurantController.addMenuItem);

router.route('/:id/menu/:itemId')
    .put(auth, validate(menuItemSchema), restaurantController.updateMenuItem)
    .delete(auth, restaurantController.deleteMenuItem);

export default router;
