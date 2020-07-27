'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const production = {
  dialect: 'mysql',
  dialectModule: mysql2, // Needed to fix sequelize issues with WebPack
  host: '51.161.116.202',
  port: 3306
};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, production);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
