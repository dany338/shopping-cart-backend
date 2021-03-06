
const express    = require('express');
const path       = require('path');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const db         = require('../models');
const users      = require('../api/routes/user.routes');
const orders     = require('../api/routes/order.routes');
const products   = require('../api/routes/product.routes');
const categories = require('../api/routes/category.routes');

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/.netlify/functions/server/products', products);  // path must route to lambda
app.use('/.netlify/functions/server/orders', orders);  // path must route to lambda
app.use('/.netlify/functions/server/users', users);
app.use('/.netlify/functions/server/categories', categories);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
