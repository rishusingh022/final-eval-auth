'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('users', [
      {
        id: 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1',
        email: 'admin@gmail.com',
        password:
          '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f2f2',
        email: 'user@gmail.com',
        password:
          '04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f3f3',
        email: 'user2@gmail.com',
        password:
          '6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
