module.exports = (sequelize, DataTypes) => {
  const Marketplace = sequelize.define("marketplace", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("clothes", "toys", "furniture", "books", "other"),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    condition: {
      type: DataTypes.ENUM("new", "like_new", "good", "fair", "poor"),
      allowNull: false,
      defaultValue: "good",
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  return Marketplace;
}; 