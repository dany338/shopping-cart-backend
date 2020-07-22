const db = require('../../models');
const express = require('express');
const router = express.Router();

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    await db.User.update({
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
    await db.User.create({
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
    let users = await db.User.findAll();
    res.status(200).send(users);
  } catch {
    res.status(400).send('No se pudieron obtener los usuarios');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let user = await db.User.findByPk(id);
    res.status(200).send(user);
  } catch {
    res.status(400).send('No se pudo obtener el usuario');
  }
});

module.exports = router;
