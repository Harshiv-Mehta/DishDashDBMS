"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const registerUser = async (userData) => {
    const { name, email } = userData;
    const userExists = await user_model_1.default.findOne({ where: { email } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const user = await user_model_1.default.create({
        name,
        email,
    });
    if (user) {
        return {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            token: generateToken(user.user_id),
        };
    }
    else {
        throw new Error('Invalid user data');
    }
};
exports.registerUser = registerUser;
const loginUser = async (userData) => {
    const { email } = userData;
    const user = await user_model_1.default.findOne({ where: { email } });
    if (user) {
        return {
            user_id: user.user_id,
            name: user.name,
            email: user.email,
            token: generateToken(user.user_id),
        };
    }
    else {
        throw new Error('Invalid credentials');
    }
};
exports.loginUser = loginUser;
const getUserProfile = async (userId) => {
    const user = await user_model_1.default.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (userId, userData) => {
    const user = await user_model_1.default.findByPk(userId);
    if (user) {
        user.name = userData.name || user.name;
        user.email = userData.email || user.email;
        const updatedUser = await user.save();
        return {
            user_id: updatedUser.user_id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser.user_id),
        };
    }
    else {
        throw new Error('User not found');
    }
};
exports.updateUserProfile = updateUserProfile;
