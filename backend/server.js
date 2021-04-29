const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/backend/uploads', express.static('./backend/uploads'));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/reviews', require('./routes/review'));
app.use('/api/orders', require('./routes/orders'));

if (process.env.NODE_ENV === 'production') {
  // app.use((req, res, next) => {
  //   if (req.header('x-forwarded-proto') !== 'https') {
  //     res.redirect(`https://${req.header('host')}${req.url}`);
  //   } else {
  //     next();
  //   }
  // });
  app.use(express.static(path.join(path.resolve(), '/frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(path.resolve(), 'frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('Api is running');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
