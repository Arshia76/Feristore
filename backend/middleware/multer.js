const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
var uploadProduct = multer({ storage: storage }).single('productImage');
const uploadHandlerProduct = (req, res, next) => {
  uploadProduct(req, res, (err) => {
    if (err) {
      res
        .status(400)
        .json({ message: `Bad request, ${err.message}` })
        .end();
    } else {
      // special workaround for files validating with express-validator
      req.body.file = req.file;
      next();
    }
  });
};

module.exports = uploadHandlerProduct;
