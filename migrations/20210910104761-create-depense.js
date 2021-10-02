'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Depenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      designation: {
        allowNull: false,
        type: Sequelize.STRING
      },
      montant: {
        type: Sequelize.FLOAT
      },
      taskId: {
        type: Sequelize.INTEGER,
        
        references: {
          model: 'Tasks',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Depenses');
  }
};