'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Panier_Burgers', 'PanierId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Paniers', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Panier_Burgers', 'PanierId')
  }
};
