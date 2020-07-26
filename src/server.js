var http = require('http');
const express    = require('express');
const serverless = require("serverless-http");
const bodyParser = require('body-parser');
const users      = require('../api/routes/user.routes');
const orders     = require('../api/routes/order.routes');
const products   = require('../api/routes/product.routes');
const categories = require('../api/routes/category.routes');

const app = express();
var servidor = http.createServer(function(peticion, respuesta) {
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/products', products);
app.use('/api/categories', categories);
const port = process.env.PORT || '5000';
  // app.listen(port, () => console.log(`Servidor corriendo en localhost:${port}`));
});
servidor.listen(5000);
console.log('Ejecutando un server local con un node.js');
// module.exports = app;
// module.exports.handler = serverless(app);
