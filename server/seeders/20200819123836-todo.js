'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('todos',[{
     title:"todo 1",
     deadline:'2020-03-01',
     priority:'low',
     description:'this is how i live now',
     categoryId:1,
     userId:1,
     createdAt:new Date(),
     updatedAt:new Date(),
   },{
    title:"todo 2",
    deadline:"2020-10-01",
    priority:'medium',
    description:'this is how i live now',
    categoryId:1,
    userId:2,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 3",
    deadline:"2020-09-01",
    priority:'high',
    description:'this is how i live now',
    categoryId:2,
    userId:3,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 4",
    deadline:"2020-01-01",
    priority:'low',
    description:'this is how i live now',
    categoryId:2,
    userId:4,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 5",
    deadline:"2020-02-01",
    priority:'medium',
    description:'this is how i live now',
    categoryId:3,
    userId:5,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 6",
    deadline:"2020-06-01",
    priority:'high',
    description:'this is how i live now',
    categoryId:3,
    userId:6,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 7",
    deadline:"2020-10-01",
    priority:'low',
    description:'this is how i live now',
    categoryId:4,
    userId:1,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 8",
    deadline:"2020-08-01",
    priority:'medium',
    description:'this is how i live now',
    categoryId:4,
    userId:2,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 9",
    deadline:"2020-06-01",
    priority:'high',
    description:'this is how i live now',
    categoryId:1,
    userId:3,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"todo 10",
    deadline:"2020-04-01",
    priority:'low',
    description:'this is how i live now',
    categoryId:2,
    userId:4,
    createdAt:new Date(),
    updatedAt:new Date(),
  }])
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('todos',null,{})
  }
};
