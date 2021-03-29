const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { check, validationResult } = require('express-validator');
const paginatedResults = require('../middleware/pagination');

router.get('/', paginatedResults(Category), async (req, res) => {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.post(
  '/category/create',
  [check('category').not().isEmpty().withMessage('لطفا نام دسته را وارد کنید')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { category } = req.body;
      const exist = await Category.findOne({ category });
      if (exist) {
        return res.status(400).json({ msg: 'دسته بندی موجود است' });
      }
      const data = await Category.create({ category });
      return res.status(201).json(data);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.put(
  '/category/:id/update',
  [check('category').not().isEmpty().withMessage('لطفا نام دسته را وارد کنید')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { category } = req.body;
      const exist = await Category.findOne({ category });
      if (exist) {
        return res.status(400).json({ msg: 'دسته بندی موجود است' });
      }
      const data = await Category.findByIdAndUpdate(
        req.params.id,
        { category },
        { new: true }
      );
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.delete('/category/:id/delete', async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: 'دسته بندی با موفقیت حذف شد' });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
