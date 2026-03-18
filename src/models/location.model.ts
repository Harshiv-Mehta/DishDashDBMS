import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Location extends Model {
    public location_id!: number;
    public area_name!: string;
    public pincode!: string;
    public city!: string;
}

Location.init({
    location_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    area_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        defaultValue: 'Pune',
    },
}, {
    sequelize,
    tableName: 'locations',
    timestamps: false,
});

export default Location;
