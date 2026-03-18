import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Platform extends Model {
  public platform_id!: number;
  public platform_name!: string;
}

Platform.init({
  platform_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  platform_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'platforms',
  timestamps: false,
});

export default Platform;




