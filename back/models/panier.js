'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Panier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Panier.init({
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Panier',
  });
  Panier.associate = (models) => {
    Panier.belongsTo(models.User, {foreignKey:'UserId'})
  }
  Panier.associate = (models) => {
    Panier.hasMany(models.Panier_Burger)
  }
  return Panier;
};