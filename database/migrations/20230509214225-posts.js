'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: { allowNull: false, type: Sequelize.STRING },
      content: { allowNull: false, type: Sequelize.STRING },
      image: { type: Sequelize.STRING },
      userId: { type: Sequelize.INTEGER },
      commentCount: { type: Sequelize.INTEGER },
      postLikes: { defaultValue: [], type: Sequelize.JSONB },
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('posts')
  }
};
