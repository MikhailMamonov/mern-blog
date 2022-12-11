'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('comments', {
      id: Sequelize.INTEGER,
      comment: { type: Sequelize.DataTypes.STRING(8000), allowNull: false },
      author: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      post_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('comments');
  },
};
