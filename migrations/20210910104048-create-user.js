'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        allowNull:false,
        type: Sequelize.STRING
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: 'id'
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
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
    await queryInterface.dropTable('Users');
  }
};