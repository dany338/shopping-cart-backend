'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const users      = require('../api/routes/user.routes');
const orders     = require('../api/routes/order.routes');
const products   = require('../api/routes/product.routes');
const categories = require('../api/routes/category.routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/categories', categories);

app.listen(5000, () => console.log('Local app listening on port 5000!'));
