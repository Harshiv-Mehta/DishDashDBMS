import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class PriceComparison extends Model {
  public comparison_id!: number;
  public product_id!: number;
  public platform_id!: number;
  public price!: number;
  public discount!: number;
}

PriceComparison.init({
  comparison_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  platform_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
}, {
  sequelize,
  tableName: 'pricecomparison',
  timestamps: false,
});


export default PriceComparison;

