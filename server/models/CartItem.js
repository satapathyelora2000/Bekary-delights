const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cart = require('./Cart');
const Product = require('./Product');

const CartItem = sequelize.define('CartItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
}, { timestamps: false });

CartItem.belongsTo(Cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
Cart.hasMany(CartItem, { foreignKey: 'cart_id' });

CartItem.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
Product.hasMany(CartItem, { foreignKey: 'product_id' });

module.exports = CartItem;
