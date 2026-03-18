import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Product from './product.model';
import PriceComparison from './priceComparison.model';

class Redirection extends Model {
  public redirect_id!: number;
  public comparison_id!: number;
  public redirect_url!: string;
}

Redirection.init({
  redirect_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  comparison_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  redirect_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'redirection',
  timestamps: false,
});


export default Redirection;

