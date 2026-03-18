"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Platform extends sequelize_1.Model {
}
Platform.init({
    platform_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    platform_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'platforms',
    timestamps: false,
});
exports.default = Platform;
