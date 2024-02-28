'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
   return queryInterface.bulkInsert('user', [{
    email: 'testemail@gmail.com',
    password: 'senhateste',
    created_at: new Date(),
   }])
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('user', null, {})
  }
};
