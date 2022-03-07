'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn("story", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      allowNull: false,
    });

    await queryInterface.addColumn("story", "categoryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "category",
        allowNull: false,
        key: "id",
      },
      onUpdate: "CASCADE",
    });
    await queryInterface.addColumn("users", "isArtist", {
      type: Sequelize.BOOLEAN,
      
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("artworks", "userId", Sequelize.INTEGER);
    await queryInterface.removeColumn("bids", "artworkId", Sequelize.INTEGER);
    await queryInterface.removeColumn("users", "isArtist", Sequelize.BOOLEAN);
    
  },
};