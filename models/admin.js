'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    security_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    security_question_ans: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token:{
      type: DataTypes.STRING,
      allowNull: true
    }
  }, { 
    timestamps: true,
    paranoid: true
  });
  
  return Admin;
};