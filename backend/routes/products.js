const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { authorize, admin } = require('../middleware/authorize');
const uploadHandlerProduct = require('../middleware/multer');
const { check, validationResult } = require('express-validator');

router.get('/', authorize, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/:category', async (req, res) => {
  try {
    const data = await Product.find({ category: req.params.category });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/special/products', async (req, res) => {
  try {
    const data = await Product.find({ special: true });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/new/products', async (req, res) => {
  try {
    const data = await Product.find({ carousel: true });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.post(
  '/create',
  authorize,
  admin,
  uploadHandlerProduct,
  [
    check('name').not().isEmpty().withMessage('لطفا نام محصول را وارد کنید'),
    check('category')
      .not()
      .isEmpty()
      .withMessage('لطفا دسته بندی محصول را مشخص کنید'),
    check('file').not().isEmpty().withMessage('لطفا عکس محصول را انتخاب کنید'),
    check('description')
      .not()
      .isEmpty()
      .withMessage('لطفا توضیحات کالا را وارد کنید'),
    check('price').not().isEmpty().withMessage('لطفا قیمت محصول را مشخص کنید'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const {
        file,
        countInStock,
        name,
        category,
        price,
        description,
      } = req.body;

      const product = new Product({
        image: file.path,
        countInStock,
        name,
        category,
        price,
        description,
      });

      if (req.body.special) {
        product.special = req.body.special;
      }

      if (req.body.carousel) {
        product.carousel = req.body.carousel;
      }

      if (req.body.discount > 0) {
        const discount = (product.price * req.body.discount) / 100;
        product.price = product.price - discount;
        product.discount = req.body.discount;
        product.isDiscount = true;
      }

      const existingProducts = await Product.find({});

      const isMatch = existingProducts.includes(product);

      if (isMatch) {
        return res.status(400).json({ msg: 'محصول موجود می باشد' });
      }

      await product.save();

      return res.status(200).json(product);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);
router.put(
  '/:id/update',
  authorize,
  admin,
  uploadHandlerProduct,
  check('name').not().isEmpty().withMessage('لطفا نام محصول را وارد کنید'),
  check('countInStock')
    .not()
    .isEmpty()
    .withMessage('لطفا تعداد محصول در فروشگاه را وارد کنید'),
  check('category')
    .not()
    .isEmpty()
    .withMessage('لطفا دسته بندی محصول را مشخص کنید'),
  check('description')
    .not()
    .isEmpty()
    .withMessage('لطفا توضیحات کالا را وارد کنید'),
  check('price').not().isEmpty().withMessage('لطفا قیمت محصول را مشخص کنید'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { countInStock, name, category, price, description } = req.body;

      const product = new Product({
        countInStock,
        name,
        category,
        price,
        description,
      });

      if (req.body.special) {
        product.special = req.body.special;
      }

      if (req.body.carousel) {
        product.carousel = req.body.carousel;
      }

      if (req.body.discount > 0) {
        const discount = (product.price * req.body.discount) / 100;
        product.price = product.price - discount;
        product.discount = req.body.discount;
        product.isDiscount = true;
      }

      if (req.body.file) {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            image: req.body.file.path,
            name: product.name,
            countInStock: product.countInStock,
            description: product.description,
            carousel: product.carousel,
            special: product.special,
            category: product.category,
            price: product.price,
            discount: product.discount,
            isDiscount: product.isDiscount,
          },
          {
            new: true,
          }
        );

        return res.status(200).json(updatedProduct);
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: product.name,
          countInStock: product.countInStock,
          description: product.description,
          carousel: product.carousel,
          special: product.special,
          category: product.category,
          price: product.price,
          discount: product.discount,
          isDiscount: product.isDiscount,
        },
        {
          new: true,
        }
      );

      return res.status(200).json(updatedProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.delete('/:id/delete', authorize, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    return res
      .status(200)
      .json({ msg: 'محصول به درستی حذف گردید.', id: product._id });
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/category/products', async (req, res) => {
  try {
    const { category } = req.body;
    const data = await Product.find({ category });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/search/product/:product', async (req, res) => {
  try {
    const reg = req.params.product;
    const regex = new RegExp(reg, 'i');
    const data = await Product.find({ name: { $regex: regex } });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/discount', async (req, res) => {
  try {
    const data = await Product.find({ isDiscount: true });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
