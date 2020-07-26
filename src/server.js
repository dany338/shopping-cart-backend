const express    = require('express');
const serverless = require("serverless-http");
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

app.listen(4000, () => console.log('Servidor corriendo en localhost:4000 '));

module.exports = app;
module.exports.handler = serverless(app);
