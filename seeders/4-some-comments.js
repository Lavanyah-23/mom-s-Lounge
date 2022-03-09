"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "comments",
      [
        {
          comments: "more strength to you dear",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          storyId: 1,
        },
        {
          comments: "I like babies",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          storyId: 1,
        },
        {
          comments: "toodlers are not easy to manage",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          storyId: 1,
        },
        {
          comments: "I like your pregnancy jorney",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          storyId: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
