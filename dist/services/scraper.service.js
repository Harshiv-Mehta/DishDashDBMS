"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchPrices = async (productName) => {
    try {
        const response = await axios_1.default.post('http://localhost:8000/scrape', {
            item: productName,
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching prices from Python scraper:', error);
        // Check for specific error conditions if possible, e.g., network error
        // For now, a general check that implies server might be down
        if (axios_1.default.isAxiosError(error) && error.code === 'ECONNREFUSED') {
            throw new Error('Scraper Unavailable: Could not connect to the scraping service.');
        }
        throw new Error('Failed to fetch prices: An unexpected error occurred.');
    }
};
exports.fetchPrices = fetchPrices;
