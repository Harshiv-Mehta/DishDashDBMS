import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Favorite extends Model {
  public favorite_id!: number;
  public user_id!: number;
  public product_id!: number;
  public created_at!: Date;
}

Favorite.init({
  favorite_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'favorites',
  timestamps: false,
});

export default Favorite;
