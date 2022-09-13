'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_quotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_quotes.init({
    userId: DataTypes.INTEGER,
    quoteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_quotes',
  });
  return user_quotes;
};