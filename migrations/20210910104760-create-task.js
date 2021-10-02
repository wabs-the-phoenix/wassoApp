'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      projectId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id'
        }
      },
      stateId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'States',
          key: 'id'
        }
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Teams',
          key: 'id'
        }
      },
      priorityId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Priorities',
          key: 'id'
        }
      },
      level: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      realEndDate: {
        allowNull: true,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Tasks');
  }
};