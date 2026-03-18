"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Redirection extends sequelize_1.Model {
}
Redirection.init({
    redirect_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    comparison_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    redirect_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    tableName: 'redirection',
    timestamps: false,
});
exports.default = Redirection;
