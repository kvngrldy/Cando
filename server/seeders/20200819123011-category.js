'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('categories', [{
      name: "Preparation",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Launch",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Preparation",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Launch",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('categories', null, {})
  }
};
