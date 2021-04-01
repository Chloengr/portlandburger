'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cart.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {foreignKey:'UserId'})
  }
  Cart.associate = (models) => {
    Cart.hasMany(models.Cart_Burger, { onDelete: 'cascade' })
  }
  return Cart;
};