'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('posts', 'text', {
      type: Sequelize.STRING(8000),
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('posts', 'text', { type: Sequelize.STRING });
  },
};
