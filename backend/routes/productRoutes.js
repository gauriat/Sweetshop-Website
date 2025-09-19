const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const asyncHandler = require('express-async-handler');
const { protect, admin } = require('../middleware/authMiddleware');

// GET /api/products?keyword=&category=
router.get('/', asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    $or: [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } }
    ]
  } : {};

  const categoryFilter = req.query.category ? { category: req.query.category } : {};

  const products = await Product.find({ ...keyword, ...categoryFilter });
  res.json(products);
}));

// POST /api/products (admin)
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;
  const product = new Product({ name, price, description, image, category, countInStock });
  const created = await product.save();
  res.status(201).json(created);
}));

// PUT /api/products/:id (admin)
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }

  const fields = ['name','price','description','image','category','countInStock'];
  fields.forEach(f => { if (req.body[f] !== undefined) product[f] = req.body[f]; });

  const updated = await product.save();
  res.json(updated);
}));

// DELETE /api/products/:id (admin)
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  await product.remove();
  res.json({ message: 'Product removed' });
}));

// POST /api/products/:id/purchase  (protected user)
router.post('/:id/purchase', protect, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error('Product not found'); }
  if (product.countInStock <= 0) { res.status(400); throw new Error('Product out of stock'); }
  product.countInStock = product.countInStock - 1;
  await product.save();
  res.json({ message: 'Purchased', product });
}));

module.exports = router;
