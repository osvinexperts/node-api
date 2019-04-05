'use strict';
module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stakeHolderContacted: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contactedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    internalTeamMember: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issuePurpose: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: true,
    paranoid: true
  });
  History.associate = function(models) {
    History.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };
  return History;
};