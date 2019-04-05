'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      keyContact: {
        type: Sequelize.STRING,
        allowNull: false
      },
      keyContactNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      keyContactEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      key: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      overallHealth: {
        type: Sequelize.ENUM('Green', 'Yellow', 'Red'),
        allowNull: false,
      },
      sourced: {
        type: Sequelize.ENUM('Direct', 'Partnership'),
      },
      partnerName: {
        type: Sequelize.STRING,
      },
      salesRep: {
        type: Sequelize.STRING,
        allowNull: false
      },
      csm: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uploadedQuotes: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      signedNda: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      signedEula: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      signedMsa: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      contractStartDate: {
        type: Sequelize.DATEONLY
      },
      contractRenewalDate: {
        type: Sequelize.DATEONLY
      },
      contractRenewalAmount: {
        type: Sequelize.DECIMAL(10, 2)
      },
      totalThreatModelsPurchase: {
        type: Sequelize.STRING
      },
      consumptionNumber: {
        type: Sequelize.STRING
      },
      editionType: {
        type: Sequelize.ENUM('AppSec - Standard Edition', 'AppSec - DevOps Edition', 'Cloud - DevOps Edition', 'Cloud - Enterprise Edition')
      },
      supportPackage: {
        type: Sequelize.ENUM('Standard', 'Premium', 'Platinum', 'None'),
        allowNull: false
      },
      trainingPackage: {
        type: Sequelize.STRING
      },
      trainingTime: {
        type: Sequelize.STRING
      },
      DeploymentType: {
        type: Sequelize.ENUM('Public', 'Private', 'On Premise')
      },
      cloudProvider: {
        type: Sequelize.STRING
      },
      PlatformVersion: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Customers');
  }
};