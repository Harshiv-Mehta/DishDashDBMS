"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callResearcher = void 0;
const axios_1 = __importDefault(require("axios"));
// This connects to your FastAPI server running on port 8000
const SCRAPER_URL = 'http://localhost:8000/compare';
const callResearcher = async (productName) => {
    try {
        const response = await axios_1.default.post(SCRAPER_URL, {
            product_name: productName
        });
        // This returns the price data from Python (Zomato/Swiggy results)
        return response.data;
    }
    catch (error) {
        console.error('Bridge Error: Could not reach FastAPI researcher.', error);
        throw new Error('Scraper connection failed');
    }
};
exports.callResearcher = callResearcher;
