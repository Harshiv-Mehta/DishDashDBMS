import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import auth from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import Joi from 'joi';

const router = Router();

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

router.post('/register', validate(registerSchema), userController.registerUser);
router.post('/login', validate(loginSchema), userController.loginUser);
router.route('/profile').get(auth, userController.getUserProfile).put(auth, userController.updateUserProfile);

export default router;
