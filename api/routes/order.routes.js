const db = require('../../models');
const express = require('express');
const router = express.Router();

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    await db.Order.update({
      password: 'contraseña',
    }, {
      where: { id: 1 }
    });
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send('Usuario creado');
  } catch (error) {
    res.status(400).send('No se pudo crear el usuario');
  }
});

router.post('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  // res.set('Allow', true);
  res.set('Content-Type', 'application/json; charset=utf-8');
  // res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  const body = JSON.parse(req.body);
  console.log(body);
  let orders = body.orders;
  let customer = body.customer;
  let code = body.code;
  let total = body.total;
  let userMe = null;
  let newOrder = null;
  let userId = null;

  try {
    if(customer.id !== null) {
      userMe = await db.User.update({
        fullname: customer.fullName,
        identification: customer.identification,
        address: customer.address,
        phonenumber: customer.phoneNumber,
        email: customer.email
      }, {
        where: { id: customer.id }
      });
      userId = customer.id;
    } else {
      await db.User.create({
        fullname: customer.fullName,
        identification: customer.identification,
        address: customer.address,
        phonenumber: customer.phoneNumber,
        email: customer.email
      });
      const user = await db.User.findOne({email: customer.email});
      if(user) {
        userId = user.dataValues.id
      }
      console.log('userMe', user, userId);
    }

    if(userId) {
      newOrder = await db.Order.create({
        userId,
        code,
        total,
        status: 1,
      });
      if(newOrder) {
        await orders.forEach(async (order) => {
          db.Ordersummary.create({
            orderId: newOrder.id,
            productId: order.id,
            units: order.units,
            total: order.total,
            status: 1,
          });

          let product = await db.Product.findByPk(order.id);
          if(product) {
            db.Product.update({
              sellers: product.sellers + order.units,
              stock: product.stock - order.units,
              status: ((product.stock - order.units) <= 0) ? 2 : 1
            }, {
              where: { id: product.id }
            });
          }
        });
      }
    }
    res.status(200).send(newOrder);
  } catch (error) {
    res.status(400).send('No se pudo crear la orden');
  }
});

router.get('/', async (req, res) => {
  try {
    let orders = await db.Order.findAll();
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(orders);
  } catch {
    res.status(400).send('No se pudieron obtener los ordenes');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let order = await db.Order.findByPk(id);
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(order);
  } catch {
    res.status(400).send('No se pudo obtener la orden');
  }
});

module.exports = router;
