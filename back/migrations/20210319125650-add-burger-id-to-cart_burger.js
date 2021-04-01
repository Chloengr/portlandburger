'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Cart_Burgers', 'BurgerId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Burgers', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Cart_Burgers', 'BurgerId')
    }
};