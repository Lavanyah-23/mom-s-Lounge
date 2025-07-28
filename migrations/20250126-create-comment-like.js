'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('commentLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'comments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraint to prevent duplicate likes
    await queryInterface.addIndex('commentLikes', ['userId', 'commentId'], {
      unique: true,
      name: 'unique_user_comment_like'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('commentLikes');
  }
};
