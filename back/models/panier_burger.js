"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Panier_Burger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Panier_Burger.init(
    {
      qte: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Panier_Burger",
    }
  );
  Panier_Burger.associate = (models) => {
    Panier_Burger.belongsTo(models.Burger);
  };
  return Panier_Burger;
};
