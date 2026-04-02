"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchHistory = exports.saveSearch = exports.removeFavorite = exports.addFavorite = exports.getFavorites = exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const favorite_model_1 = __importDefault(require("../models/favorite.model"));
const searchHistory_model_1 = __importDefault(require("../models/searchHistory.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
const sanitizeUser = (user) => ({
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    address: user.address,
    token: generateToken(user.user_id),
});
const registerUser = async (userData) => {
    const { name, email, password, address } = userData;
    const userExists = await user_model_1.default.findOne({ where: { email } });
    if (userExists) {
        throw new Error('User already exists');
    }
    const password_hash = await bcryptjs_1.default.hash(password, 10);
    const user = await user_model_1.default.create({
        name,
        email,
        password_hash,
        address,
    });
    if (user) {
        return sanitizeUser(user);
    }
    else {
        throw new Error('Invalid user data');
    }
};
exports.registerUser = registerUser;
const loginUser = async (userData) => {
    const { email, password } = userData;
    const user = await user_model_1.default.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcryptjs_1.default.compare(password, user.password_hash || '');
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    user.last_login = new Date();
    await user.save();
    return sanitizeUser(user);
};
exports.loginUser = loginUser;
const getUserProfile = async (userId) => {
    const user = await user_model_1.default.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        address: user.address,
        last_login: user.last_login,
        created_at: user.created_at,
    };
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (userId, userData) => {
    const user = await user_model_1.default.findByPk(userId);
    if (user) {
        user.name = userData.name || user.name;
        user.email = userData.email || user.email;
        user.address = userData.address ?? user.address;
        if (userData.password) {
            user.password_hash = await bcryptjs_1.default.hash(userData.password, 10);
        }
        const updatedUser = await user.save();
        return sanitizeUser(updatedUser);
    }
    else {
        throw new Error('User not found');
    }
};
exports.updateUserProfile = updateUserProfile;
const getFavorites = async (userId) => {
    const favorites = await favorite_model_1.default.findAll({
        where: { user_id: userId },
        include: [{ model: product_model_1.default, attributes: ['product_id', 'product_name', 'category', 'restaurant_name', 'image_url'] }],
        order: [['created_at', 'DESC']],
    });
    return favorites.map((favorite) => ({
        favorite_id: favorite.favorite_id,
        product_id: favorite.product_id,
        created_at: favorite.created_at,
        product: favorite.Product,
    }));
};
exports.getFavorites = getFavorites;
const addFavorite = async (userId, productId) => {
    const product = await product_model_1.default.findByPk(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    const [favorite] = await favorite_model_1.default.findOrCreate({
        where: { user_id: userId, product_id: productId },
        defaults: { user_id: userId, product_id: productId },
    });
    return favorite;
};
exports.addFavorite = addFavorite;
const removeFavorite = async (userId, productId) => {
    await favorite_model_1.default.destroy({ where: { user_id: userId, product_id: productId } });
    return { product_id: productId };
};
exports.removeFavorite = removeFavorite;
const saveSearch = async (userId, searchTerm) => {
    const normalized = searchTerm.trim();
    if (!normalized) {
        throw new Error('searchTerm is required');
    }
    await searchHistory_model_1.default.create({
        user_id: userId,
        search_term: normalized,
    });
    return { search_term: normalized };
};
exports.saveSearch = saveSearch;
const getSearchHistory = async (userId) => {
    const history = await searchHistory_model_1.default.findAll({
        where: { user_id: userId },
        order: [['searched_at', 'DESC']],
        limit: 8,
    });
    const uniqueTerms = Array.from(new Map(history.map((item) => [item.search_term.toLowerCase(), item])).values());
    return uniqueTerms.map((item) => ({
        search_id: item.search_id,
        search_term: item.search_term,
        searched_at: item.searched_at,
    }));
};
exports.getSearchHistory = getSearchHistory;
