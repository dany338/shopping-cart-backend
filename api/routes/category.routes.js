const db = require('../../models');
const express = require('express');
const router = express.Router();

router.put('/:id', async (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    await db.Category.update({
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
    await db.Category.create({
      name,
      email,
      password,
    });
    res.status(200).send('Usuario creado');
  } catch (error) {
    res.status(400).send('No se pudo crear el usuario');
  }
});

router.get('/all', async (req, res) => {
  try {
    let categories = await db.Category.findAll();
    res.status(200).send(categories);
  } catch {
    res.status(400).send('No se pudieron obtener los usuarios');
  }
});

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let category = await db.Category.findByPk(id);
    res.status(200).send(category);
  } catch {
    res.status(400).send('No se pudo obtener el usuario');
  }
});

module.exports = router;
