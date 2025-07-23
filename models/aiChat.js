module.exports = (sequelize, DataTypes) => {
  const AiChat = sequelize.define("aiChat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isSaved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return AiChat;
}; 