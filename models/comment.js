'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     comment.belongsTo(models.user,{ foreignKey : "userId"})
     comment.belongsTo(models.story,{ foreignKey : "storyId"})
    }
  };
  comment.init({
    comments: { type: DataTypes.STRING, allowNull: true },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};