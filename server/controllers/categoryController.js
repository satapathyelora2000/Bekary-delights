const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    const categories = await Category.findAll();
    res.json(categories);
};

exports.createCategory = async (req, res) => {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
    const { name, description } = req.body;
    await Category.update({ name, description }, { where: { id: req.params.id } });
    res.json({ message: 'Category updated' });
};

exports.deleteCategory = async (req, res) => {
    await Category.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Category deleted' });
};
