const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.getAllOrders = async (req, res) => {
    const orders = await Order.findAll({ include: [OrderItem] });
    res.json(orders);
};

exports.createOrder = async (req, res) => {
    const { user_id, items, total } = req.body;

    const order = await Order.create({ user_id, total });
    const orderItems = items.map(i => ({ order_id: order.id, product_id: i.product_id, quantity: i.quantity }));
    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({ order, orderItems });
};
