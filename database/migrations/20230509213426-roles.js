'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('roles', {
       id: {
         unique: true,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
         type: Sequelize.INTEGER,
       },
       value: { unique: true, allowNull: false, type: Sequelize.STRING },
       description: { allowNull: false, type: Sequelize.STRING },
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('roles')
  }
};
