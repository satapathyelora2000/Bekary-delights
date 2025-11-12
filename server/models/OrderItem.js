const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { timestamps: false });

OrderItem.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
Order.hasMany(OrderItem, { foreignKey: 'order_id' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

module.exports = OrderItem;
