'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.quote.belongsToMany(models.user, {through: "user_quotes", onDelete: 'CASCADE'} )
      models.quote.hasMany(models.reflection)
    }
  }
  quote.init({
    content: DataTypes.TEXT,
    author: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quote',
  });
  return quote;
};