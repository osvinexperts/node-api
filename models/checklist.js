'use strict';
module.exports = (sequelize, DataTypes) => {
  const CheckList = sequelize.define('CheckList', {
    taskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignedTo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    createdBy: {
      type: DataTypes.STRING
    }
  }, { 
    timestamps: true,
    paranoid: true,
    scopes: {
      incomplete: {
        where: {
          status: false
        }
      }
    }
  });
  
  CheckList.associate = function(models) {
    CheckList.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    })
  };
  return CheckList;
};