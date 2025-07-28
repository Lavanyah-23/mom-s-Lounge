'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      commentLike.belongsTo(models.user, { foreignKey: "userId" });
      commentLike.belongsTo(models.comment, { foreignKey: "commentId" });
    }
  };
  commentLike.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'commentLike',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'commentId']
      }
    ]
  });
  return commentLike;
};
