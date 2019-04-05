'use strict';
module.exports = (sequelize, DataTypes) => {
  const PoInvoice = sequelize.define('PoInvoice', {
    poNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    poDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    invoiceNumber: {
      type: DataTypes.STRING
    },
    invoiceDate: {
      type: DataTypes.DATEONLY
    },
    poAmount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    sku: {
      type: DataTypes.STRING
    },
    pricePerThreatModel: {
      type: DataTypes.DECIMAL(10,2)
    },
    poFile: {
      type: DataTypes.STRING
    },
    invoiceFile: {
      type: DataTypes.STRING
    },
    comments: {
      type: DataTypes.TEXT
    },
    invoicePaid: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: true,
    paranoid: true
  });
  PoInvoice.associate = (models) => {
    PoInvoice.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };
  return PoInvoice;
};