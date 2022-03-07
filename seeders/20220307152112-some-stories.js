'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          
          title: "My Big Day",
          imageUrl: null,
          description:"fhhfhfgjsjkdhgghjdhgjkfdhgjfhgjkfdhgjfhgjfhguihgfdjghfjkdghjkfdghhhurghuifdhguihuighhuin b   bvdhfgdf",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          categoryId:1
        },
        {
          
          title: "My first kid",
          imageUrl: null,
          description:"fhhfhfgjsjkdhgghjdhgjkfdhgjfhgjkfdhgjfhgjfhguihgfdjghfjkdghjkfdghhhurghuifdhguihuighhuin b   bvdhfgdf",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          categoryId:1
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
