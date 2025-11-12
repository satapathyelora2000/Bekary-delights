const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Cart = sequelize.define('Cart', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
}, { timestamps: true });

Cart.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
User.hasOne(Cart, { foreignKey: 'user_id' });

module.exports = Cart;
