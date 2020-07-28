'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const multer =  require('multer');
var upload = multer();
const users      = require('./api/routes/user.routes');
const orders     = require('./api/routes/order.routes');
const products   = require('./api/routes/product.routes');
const categories = require('./api/routes/category.routes');

const app = express();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());
// app.use(upload.array());
// app.use(express.static('public'));

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/categories', categories);

app.listen(5000, () => console.log('Local app listening on port 5000!'));
