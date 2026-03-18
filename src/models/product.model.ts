import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Product extends Model {
  public product_id!: number;
  public product_name!: string;
  public restaurant_name!: string;
  public category!: string;
  public image_url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurant_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'products',
  timestamps: false,
});


export default Product;

