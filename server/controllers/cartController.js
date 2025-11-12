const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ where: { user_id: req.params.userId }, include: [CartItem] });
    res.json(cart);
};

exports.addToCart = async (req, res) => {
    let cart = await Cart.findOne({ where: { user_id: req.params.userId } });
    if (!cart) cart = await Cart.create({ user_id: req.params.userId });

    const { product_id, quantity } = req.body;
    const cartItem = await CartItem.create({ cart_id: cart.id, product_id, quantity });
    res.status(201).json(cartItem);
};
