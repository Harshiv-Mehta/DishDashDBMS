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
exports.getSearchHistory = exports.saveSearch = exports.removeFavorite = exports.addFavorite = exports.getFavorites = exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("../services/user.service"));
const registerUser = async (req, res, next) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const user = await userService.loginUser(req.body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const getUserProfile = async (req, res, next) => {
    try {
        const user = await userService.getUserProfile(req.user.user_id);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserProfile = getUserProfile;
const updateUserProfile = async (req, res, next) => {
    try {
        const user = await userService.updateUserProfile(req.user.user_id, req.body);
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.updateUserProfile = updateUserProfile;
const getFavorites = async (req, res, next) => {
    try {
        const favorites = await userService.getFavorites(req.user.user_id);
        res.json(favorites);
    }
    catch (error) {
        next(error);
    }
};
exports.getFavorites = getFavorites;
const addFavorite = async (req, res, next) => {
    try {
        const favorite = await userService.addFavorite(req.user.user_id, Number(req.body.productId));
        res.status(201).json(favorite);
    }
    catch (error) {
        next(error);
    }
};
exports.addFavorite = addFavorite;
const removeFavorite = async (req, res, next) => {
    try {
        const result = await userService.removeFavorite(req.user.user_id, Number(req.params.productId));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.removeFavorite = removeFavorite;
const saveSearch = async (req, res, next) => {
    try {
        const result = await userService.saveSearch(req.user.user_id, req.body.searchTerm);
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.saveSearch = saveSearch;
const getSearchHistory = async (req, res, next) => {
    try {
        const history = await userService.getSearchHistory(req.user.user_id);
        res.json(history);
    }
    catch (error) {
        next(error);
    }
};
exports.getSearchHistory = getSearchHistory;
