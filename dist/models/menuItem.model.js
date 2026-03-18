"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class MenuItem extends sequelize_1.Model {
}
MenuItem.init({
    item_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    restaurant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.ENUM('Veg', 'Non-Veg', 'Egg'),
        allowNull: false,
    },
    base_price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'menu_items',
    timestamps: false,
});
exports.default = MenuItem;
