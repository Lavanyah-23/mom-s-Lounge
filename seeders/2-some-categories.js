"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          type: "Pregnancy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Baby",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Toddler",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Child",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Teen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
