'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('department_users', [{
      departmentId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 1,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 2,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 2,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 2,
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      departmentId: 3,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 3,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 3,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 1,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 1,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      departmentId: 1,
      userId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('department_users', null, {})
  }
};
