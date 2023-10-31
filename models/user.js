"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.STRING,
    },
    otp_expiration_date: {
      type: DataTypes.DATE,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
  });

  // Define any associations if needed
  User.associate = (models) => {
    // Define associations here
  };


  return User;
};
