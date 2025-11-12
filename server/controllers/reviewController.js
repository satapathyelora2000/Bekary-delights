const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
    const reviews = await Review.findAll({ where: { product_id: req.params.productId } });
    res.json(reviews);
};

exports.addReview = async (req, res) => {
    const { product_id, user_id, rating, comment } = req.body;
    const review = await Review.create({ product_id, user_id, rating, comment });
    res.status(201).json(review);
};
