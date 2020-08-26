'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: "Backlog",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "On Going",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: "QC",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Done",
      departmentId:1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: "Backlog",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "On Going",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: "QC",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Done",
      departmentId:2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: "Backlog",
      departmentId:3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "On Going",
      departmentId:3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: "QC",
      departmentId:3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Done",
      departmentId:3,
      createdAt: new Date(),
      updatedAt: new Date(),
    } ])
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
