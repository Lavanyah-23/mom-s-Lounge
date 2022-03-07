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
      // onDelete: "SET NULL",
      allowNull: false,
    });
    await queryInterface.addColumn("stories", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      //onDelete: "SET NULL",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("stories", "userId", Sequelize.INTEGER);
      await queryInterface.removeColumn(
        "stories",
        "categoryId",
        Sequelize.INTEGER
      );
  },
};
