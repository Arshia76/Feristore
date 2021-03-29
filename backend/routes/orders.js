const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authorize, admin } = require('../middleware/authorize');
const ZarinpalCheckout = require('zarinpal-checkout');
const User = require('../models/User');
const paginatedResults = require('../middleware/pagination');

const zarinpal = ZarinpalCheckout.create(
  'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  true
);

router.get('/', authorize, admin, paginatedResults(Order), async (req, res) => {
  try {
    return res.status(200).json(res.paginatedResults);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get('/:id', authorize, async (req, res) => {
  try {
    const data = await Order.findById(req.params.id);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.get(
  '/user/:id',
  authorize,
  paginatedResults(Order, 'userOrder', User),
  async (req, res) => {
    try {
      // const mUser = await User.findById(req.params.id);
      // const orders = await Order.find({ 'user.email': mUser.email });

      return res.status(200).json(res.paginatedResults);
    } catch (err) {
      return res.status(500).json({ msg: 'خطای سرور' });
    }
  }
);

router.post('/create', authorize, async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      postalCode,
      city,
      address,
      totalPrice,
      orderItems,
      payDate,
      sentDate,
      productPrice,
    } = req.body;

    const order = new Order({
      user: {
        name,
        email,
        phoneNumber,
      },
      shipping: {
        postalCode,
        city,
        address,
      },

      orderItems,
      payDate,
      totalPrice,
      sentDate,
      productPrice,
    });

    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return res.status(200).json({ msg: 'خطای سرور' });
  }
});

router.get('/pay/:id/:amount/:email/:phoneNumber', authorize, (req, res) => {
  zarinpal
    .PaymentRequest({
      Amount: req.params.amount,
      CallbackURL: `http://localhost:3000/orderDetail/${req.params.id}`,
      Description: 'پرداخت',
      Email: req.params.email,
      Mobile: req.params.phoneNumber,
    })
    .then(function (response) {
      if (response.status == 100) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).json({ url: response.url });
      }
    })
    .catch((err) => {
      res.status(500).json({ msg: 'خطای سرور' });
    });
});

router.get('/PaymentVerification/:amount/:token', authorize, (req, res) => {
  zarinpal
    .PaymentVerification({
      Amount: req.params.amount,
      Authority: req.params.token,
    })
    .then((response) => {
      if (response.status == 101 || response.status == 100) {
        console.log('Verified! Ref ID: ' + response.RefID);
        res.json({ msg: 'تایید شد' });
      } else {
        console.log(response);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ msg: 'خطای سرور' });
    });
});

router.put('/update/payDate/:id', authorize, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.payDate = new Date().toLocaleDateString('fa-IR');
    await order.save();
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

router.put('/update/sentDate/:id', authorize, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.sentDate = new Date().toLocaleDateString('fa-IR');
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: 'خطای سرور' });
  }
});

module.exports = router;
