'use strict';
module.exports = function(sequelize, DataTypes) {
  var address = sequelize.define('address', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {
    classMethods: {
      underscored: true,
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return address;
};