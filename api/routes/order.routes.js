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
    res.status(200).send('Usuario creado');
  } catch (error) {
    res.status(400).send('No se pudo crear el usuario');
  }
});

router.post('/', async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    await db.Order.create({
      name,
      email,
      password,
    });
    res.status(200).send('Usuario creado');
  } catch (error) {
    res.status(400).send('No se pudo crear el usuario');
  }
});

router.get('/', async (req, res) => {
  try {
    let orders = await db.Order.findAll();
    res.status(200).send(orders);
  } catch {
    res.status(400).send('No se pudieron obtener los ordenes');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let order = await db.Order.findByPk(id);
    res.status(200).send(order);
  } catch {
    res.status(400).send('No se pudo obtener la orden');
  }
});

module.exports = router;
