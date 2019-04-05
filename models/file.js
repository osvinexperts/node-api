'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    originalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    storedName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uploadedBy: {
      type: DataTypes.STRING
    },
    savedPath: {
      type: DataTypes.STRING
    },
    lastModifiedBy: {
      type: DataTypes.STRING
    },
    fileType: {
      type: DataTypes.STRING
    },
    fileSize: {
      type: DataTypes.INTEGER
    },
  }, { 
    timestamps: true,
    paranoid: true
  });
  File.associate = function(models) {
    File.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    })
  };
  return File;
};