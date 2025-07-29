'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      like.belongsTo(models.user, { foreignKey: "userId" });
      like.belongsTo(models.story, { foreignKey: "storyId" });
    }
  };
  like.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'like',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'storyId']
      }
    ]
  });
  return like;
};
