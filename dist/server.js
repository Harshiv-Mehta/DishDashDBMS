"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const associations_1 = __importDefault(require("./models/associations"));
const start = async () => {
    try {
        // 1. Connect to Database
        await (0, db_1.connectMySQL)();
        // 2. Setup Associations
        (0, associations_1.default)();
        // 3. Sync Tables (Skipped to use existing schema)
        // await sequelize.sync();
        // 4. Start Express
        const PORT = process.env.PORT || 5000;
        app_1.default.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('Failed to start:', err);
    }
};
start();
