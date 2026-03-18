"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class PriceComparison extends sequelize_1.Model {
}
PriceComparison.init({
    comparison_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    platform_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.0,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'pricecomparison',
    timestamps: false,
});
exports.default = PriceComparison;
