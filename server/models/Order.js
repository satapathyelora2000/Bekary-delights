const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    total: DataTypes.DECIMAL(10,2),
    status: { type: DataTypes.ENUM('pending','completed','cancelled'), defaultValue: 'pending' }
}, { timestamps: true });

Order.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
