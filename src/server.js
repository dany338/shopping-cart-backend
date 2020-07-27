const express    = require('express');
const path       = require('path');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const users      = require('../api/routes/user.routes');
const orders     = require('../api/routes/order.routes');
const products   = require('../api/routes/product.routes');
const categories = require('../api/routes/category.routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/.netlify/functions/api/users', users);
app.use('/.netlify/functions/api/orders', orders);
app.use('/.netlify/functions/api/products', products);
app.use('/.netlify/functions/api/categories', categories);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
