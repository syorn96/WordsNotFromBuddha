'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reflection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.reflection.belongsTo(models.quote)
      models.reflection.belongsTo(models.user)
    }
  }
  reflection.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    quoteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'reflection',
  });
  return reflection;
};