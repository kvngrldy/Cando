'use strict';
const { hashPassword } = require('../middleware/bcryptjs')

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
    return queryInterface.bulkInsert('users', [{
      name: 'user 1',
      password: hashPassword('123'),
      email: 'user1@gmail.com',
      position: 'admin',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'user 2',
      password: hashPassword('123'),
      email: 'user2@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'user 3',
      password: hashPassword('123'),
      email: 'user3@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'user 4',
      password: hashPassword('123'),
      email: 'user4@gmail.com',
      position: 'admin',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'user 5',
      password: hashPassword('123'),
      email: 'user5@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'user 6',
      password: hashPassword('123'),
      email: 'user6@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
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
    return queryInterface.bulkDelete('users', null, {})
  }
};
