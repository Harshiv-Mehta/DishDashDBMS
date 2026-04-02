import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class SearchHistory extends Model {
  public search_id!: number;
  public user_id!: number;
  public search_term!: string;
  public searched_at!: Date;
}

SearchHistory.init({
  search_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  search_term: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  searched_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  tableName: 'search_history',
  timestamps: false,
});

export default SearchHistory;
