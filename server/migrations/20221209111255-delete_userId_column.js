'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn('posts', 'userId');
    await queryInterface.removeColumn('comments', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.addColumn('posts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });
    await queryInterface.addColumn('comments', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },
};
