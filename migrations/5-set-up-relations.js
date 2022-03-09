"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("stories", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      // allowNull: false,
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("stories", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("comments", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
    await queryInterface.addColumn("comments", "storyId", {
      type: Sequelize.INTEGER,
      references: {
        model: "stories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("stories", "userId", Sequelize.INTEGER);
    await queryInterface.removeColumn(
      "stories",
      "categoryId",
      Sequelize.INTEGER
    );
    await queryInterface.removeColumn("comments", "userId", Sequelize.INTEGER);
    await queryInterface.removeColumn("comments", "storyId", Sequelize.INTEGER);
  },
};
