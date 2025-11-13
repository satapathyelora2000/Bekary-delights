const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);

module.exports = router;
