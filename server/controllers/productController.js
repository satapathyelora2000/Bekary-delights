const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null; // save image path

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category_id,
      image_url
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, description, price, stock, category_id };
    if (image_url) updateData.image_url = image_url;

    await Product.update(updateData, { where: { id: req.params.id } });

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

exports.deleteProduct = async (req, res) => {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Product deleted' });
};
