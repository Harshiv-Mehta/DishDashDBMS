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
exports.compareProductPrices = exports.deletePriceComparison = exports.updatePriceComparison = exports.getPriceComparisonById = exports.getPriceComparisons = exports.createPriceComparison = void 0;
const priceComparisonService = __importStar(require("../services/priceComparison.service"));
const integration_service_1 = require("../services/integration.service");
const createPriceComparison = async (req, res, next) => {
    try {
        const priceComparison = await priceComparisonService.createPriceComparison(req.body);
        res.status(201).json(priceComparison);
    }
    catch (error) {
        next(error);
    }
};
exports.createPriceComparison = createPriceComparison;
const getPriceComparisons = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        const priceComparisons = await priceComparisonService.getPriceComparisons({ category, search });
        res.json(priceComparisons);
    }
    catch (error) {
        next(error);
    }
};
exports.getPriceComparisons = getPriceComparisons;
const getPriceComparisonById = async (req, res, next) => {
    try {
        const priceComparison = await priceComparisonService.getPriceComparisonById(Number(req.params.id));
        if (priceComparison) {
            res.json(priceComparison);
        }
        else {
            res.status(404).json({ message: 'PriceComparison not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getPriceComparisonById = getPriceComparisonById;
const updatePriceComparison = async (req, res, next) => {
    try {
        const priceComparison = await priceComparisonService.updatePriceComparison(Number(req.params.id), req.body);
        if (priceComparison) {
            res.json(priceComparison);
        }
        else {
            res.status(404).json({ message: 'PriceComparison not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.updatePriceComparison = updatePriceComparison;
const deletePriceComparison = async (req, res, next) => {
    try {
        const priceComparison = await priceComparisonService.deletePriceComparison(Number(req.params.id));
        if (priceComparison) {
            res.json({ message: 'PriceComparison removed' });
        }
        else {
            res.status(404).json({ message: 'PriceComparison not found' });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.deletePriceComparison = deletePriceComparison;
const compareProductPrices = async (req, res, next) => {
    try {
        const { productName } = req.body;
        if (!productName) {
            return res.status(400).json({ message: 'productName is required' });
        }
        const comparisonResults = await (0, integration_service_1.callResearcher)(productName);
        res.status(200).json(comparisonResults);
    }
    catch (error) {
        next(error);
    }
};
exports.compareProductPrices = compareProductPrices;
