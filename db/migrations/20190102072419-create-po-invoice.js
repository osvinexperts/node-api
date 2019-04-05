'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PoInvoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      poNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      poDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      invoiceNumber: {
        type: Sequelize.STRING
      },
      invoiceDate: {
        type: Sequelize.DATEONLY
      },
      poAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      sku: {
        type: Sequelize.STRING
      },
      pricePerThreatModel: {
        type: Sequelize.DECIMAL(10, 2)
      },
      poFile: {
        type: Sequelize.STRING
      },
      invoiceFile: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.TEXT
      },
      customerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Customers',
          key: 'id',
          as: 'customerId',
        },
      },
      invoicePaid: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('PoInvoices');
  }
};