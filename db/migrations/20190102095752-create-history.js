'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE', 
        references: {
          model: 'Customers',
          key: 'id',
          as: 'customerId'
        }
      },
      stakeHolderContacted: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contactedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      internalTeamMember: {
        type: Sequelize.STRING,
        allowNull: false
      },
      issuePurpose: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Histories');
  }
};