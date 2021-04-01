"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Burger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_Burger.init(
    {
      qte: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_Burger",
    }
  );
  Cart_Burger.associate = (models) => {
    Cart_Burger.belongsTo(models.Burger);
  };
  return Cart_Burger;
};
