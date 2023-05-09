'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      username: { unique: true, allowNull: false, type: Sequelize.STRING },
      email: { unique: true, allowNull: false, type: Sequelize.STRING },
      password: { allowNull: false, type: Sequelize.STRING },
      avatarLogo: { allowNull: true, type: Sequelize.STRING },
      avatarBackground: { allowNull: true, type: Sequelize.STRING },
      banned: { defaultValue: false, type: Sequelize.BOOLEAN },
      banReason: { allowNull: true, type: Sequelize.STRING },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  },
}
