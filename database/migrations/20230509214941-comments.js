'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      content: { allowNull: false, type: Sequelize.STRING },
      userId: { allowNull: false, type: Sequelize.INTEGER },
      postId: { allowNull: false, type: Sequelize.INTEGER },
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('comments')
  }
};
