import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Order extends Model {
  public id!: number;
  public totalPrice!: number;
  public status!: string;
  public userId!: number;
  public restaurantId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Preparing', 'Delivered', 'Cancelled'),
    allowNull: false,
    defaultValue: 'Pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'orders',
});

class OrderItem extends Model {
  public id!: number;
  public name!: string;
  public quantity!: number;
  public price!: number;
  public orderId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'order_items',
});

export { Order, OrderItem };

