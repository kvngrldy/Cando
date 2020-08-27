'use strict';
const { hashPassword } = require('../helpers/bcryptjs')

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.bulkInsert('users', [{
      name: 'Theo',
      password: hashPassword('123'),
      email: 'theo@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Handana',
      password: hashPassword('123'),
      email: 'handana@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Roy',
      password: hashPassword('123'),
      email: 'roy@gmail.com',
      position: 'member',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Kevin',
      password: hashPassword('123'),
      email: 'kevin@gmail.com',
      position: 'admin',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Eldwin',
      password: hashPassword('123'),
      email: 'eldwin@gmail.com',
      position: 'admin',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/d/d2/Rubber_Duck_Front_View_in_Fine_Day_20140107.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Jafar',
      password: hashPassword('123'),
      email: 'jafar@gmail.com',
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
