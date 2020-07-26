'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ordersummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ordersummary.belongsTo(models.Order);
      Ordersummary.belongsTo(models.Product);
    }
  };
  Ordersummary.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    units: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ordersummary',
    tableName: 'ordersummaries',
  });
  return Ordersummary;
};
