import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Restaurant extends Model {
  public restaurant_id!: number;
  public name!: string;
  public location_id!: number;
  public address!: string;
  public famous_for!: string;
  public rating!: number;
  public is_active!: boolean;
}

Restaurant.init({
  restaurant_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  famous_for: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  tableName: 'restaurants',
  timestamps: false,
});

export default Restaurant;

