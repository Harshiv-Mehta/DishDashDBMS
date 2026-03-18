"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Restaurant extends sequelize_1.Model {
}
Restaurant.init({
    restaurant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    location_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    famous_for: {
        type: sequelize_1.DataTypes.STRING,
    },
    rating: {
        type: sequelize_1.DataTypes.DECIMAL(2, 1),
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'restaurants',
    timestamps: false,
});
exports.default = Restaurant;
