'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    keyContact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyContactNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    keyContactEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    key: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    overallHealth: {
      type: DataTypes.ENUM('Green', 'Yellow', 'Red'),
      allowNull: false,
    },
    sourced: {
      type: DataTypes.ENUM('Direct', 'Partnership'),
    },
    partnerName: {
      type: DataTypes.STRING,
    },
    salesRep: {
      type: DataTypes.STRING,
      allowNull: false
    },
    csm: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadedQuotes: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    signedNda: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    signedEula: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    signedMsa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    contractStartDate: {
      type: DataTypes.DATEONLY
    },
    contractRenewalDate: {
      type: DataTypes.DATEONLY
    },
    contractRenewalAmount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    totalThreatModelsPurchase: {
      type: DataTypes.STRING
    },
    consumptionNumber: {
      type: DataTypes.STRING
    },
    editionType: {
      type: DataTypes.ENUM('AppSec - Standard Edition', 'AppSec - DevOps Edition', 'Cloud - DevOps Edition', 'Cloud - Enterprise Edition')
    },
    supportPackage: {
      type: DataTypes.ENUM('Standard', 'Premium', 'Platinum', 'None'),
      allowNull: false
    },
    trainingPackage: {
      type: DataTypes.STRING
    },
    trainingTime: {
      type: DataTypes.STRING
    },
    DeploymentType: {
      type: DataTypes.ENUM('Public', 'Private', 'On Premise')
    },
    cloudProvider: {
      type: DataTypes.STRING
    },
    PlatformVersion: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    paranoid: true
  });
  Customer.associate = (models) => {
    Customer.hasMany(models.PoInvoice, {
      foreignKey: 'customerId',
      as: 'invoices',
    });

    Customer.hasMany(models.History, {
      foreignKey: 'customerId',
      as: 'histories',
    });

    Customer.hasMany(models.CheckList, {
      foreignKey: 'customerId',
      as: 'checklist',
    });

    Customer.hasMany(models.File, {
      foreignKey: 'customerId',
      as: 'files'
    })

    Customer.hasMany(models.CheckList.scope('incomplete'), {
      foreignKey: 'customerId',
      as: 'incompleteTasks',
    });
  };
  return Customer;
};