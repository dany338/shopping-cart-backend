'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productcategory.belongsTo(models.Product);
      Productcategory.belongsTo(models.Category);
    }
  };
  Productcategory.init({
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Productcategory',
  });
  return Productcategory;
};
