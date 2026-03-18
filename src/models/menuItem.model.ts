import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Restaurant from './restaurant.model';

class MenuItem extends Model {
    public item_id!: number;
    public restaurant_id!: number;
    public item_name!: string;
    public category!: 'Veg' | 'Non-Veg' | 'Egg';
    public base_price!: number;
    public image_url?: string;
}

MenuItem.init({
    item_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM('Veg', 'Non-Veg', 'Egg'),
        allowNull: false,
    },
    base_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'menu_items',
    timestamps: false,
});

export default MenuItem;

