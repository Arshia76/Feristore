const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authorize, admin } = require('../middleware/authorize');
const { check, validationResult } = require('express-validator');
const paginatedResults = require('../middleware/pagination');

router.get('/:id', paginatedResults(Product, 'reviews'), async (req, res) => {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (err) {
    return res.status(500).json({ msg: 'حطای سرور' });
  }
});

router.delete('/:pid/:rid', authorize, admin, async (req, res) => {
  try {
    const data = await Product.findById(req.params.pid);
    data.reviews = data.reviews.filter((r) => r._id != req.params.rid);
    data.numOfReviews--;
    const sum =
      data.reviews.length > 0
        ? data.reviews.reduce((sum, cur) => sum + cur.rating, 0)
        : 0;
    const newTot = data.numOfReviews === 0 ? 1 : data.numOfReviews;
    data.rating = sum / newTot === 0 ? 1 : sum / newTot;
    await data.save();

    return res.status(200).json({ msg: 'نظر حذف شد', data });
  } catch (err) {
    return res.status(500).json({ msg: 'حطای سرور' });
  }
});

router.post(
  '/review/:id',
  authorize,
  [
    check('review').not().isEmpty().withMessage('لطفا نظر خود را بنویسید'),
    check('rating').not().isEmpty().withMessage('لطفا رتبه کالا را مشخص کنید'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { review, rating } = req.body;
      const product = await Product.findById(req.params.id);

      const alreadyReview = product.reviews.find(
        (r) => r.reviewer === req.user.username
      );

      if (alreadyReview) {
        return res.status(400).json({ msg: 'نظر شما ثبت شده است' });
      }

      const newReview = {
        reviewer: req.user.username,
        review: review,
        rating: rating,
      };

      product.reviews.push(newReview);
      product.numOfReviews++;

      const sum = product.reviews.reduce((sum, cur) => sum + cur.rating, 0);
      product.rating = sum / product.numOfReviews;

      await product.save();
      return res.status(200).json({ msg: 'نظر شما با موفقیت ثبت شد' });
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

module.exports = router;
