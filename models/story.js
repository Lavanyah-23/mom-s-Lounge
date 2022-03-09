"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      story.belongsTo(models.user, { foreignKey: "userId" });
      story.belongsTo(models.category, { foreignKey: "categoryId" });
      // story.belongsToMany(models.comment, {
      //   through: "",
      //   foreignKey: "",
      // })
      
    }
  }
  story.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: "story",
    }
  );
  return story;
};
