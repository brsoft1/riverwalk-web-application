'use strict';
module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define('Author', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //An author can have many books.
        Author.hasMany(models.Book, {
          onDelete: 'cascade'
        });
      }
    }
  });
  return Author;
};