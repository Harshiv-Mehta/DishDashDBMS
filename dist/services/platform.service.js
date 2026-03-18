"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlatform = exports.updatePlatform = exports.getPlatformById = exports.getPlatforms = exports.createPlatform = void 0;
const platform_model_1 = __importDefault(require("../models/platform.model"));
const createPlatform = async (platformData) => {
    return await platform_model_1.default.create(platformData);
};
exports.createPlatform = createPlatform;
const getPlatforms = async () => {
    return await platform_model_1.default.findAll();
};
exports.getPlatforms = getPlatforms;
const getPlatformById = async (id) => {
    return await platform_model_1.default.findByPk(id);
};
exports.getPlatformById = getPlatformById;
const updatePlatform = async (id, platformData) => {
    const [affectedCount] = await platform_model_1.default.update(platformData, {
        where: { platform_id: id },
    });
    if (affectedCount > 0) {
        return await platform_model_1.default.findByPk(id);
    }
    return null;
};
exports.updatePlatform = updatePlatform;
const deletePlatform = async (id) => {
    return await platform_model_1.default.destroy({
        where: { platform_id: id },
    });
};
exports.deletePlatform = deletePlatform;
