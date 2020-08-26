'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('todos',[{
     title:"All Things Start Here",
     deadline:'2020-03-01',
     priority:'low',
     description:'For The Best',
     categoryId:1,
     userId:1,
     createdAt:new Date(),
     updatedAt:new Date(),
   },{
    title:"All Things Start Here",
    deadline:'2020-03-01',
    priority:'low',
    description:'For The Best',
    categoryId:5,
    userId:4,
    createdAt:new Date(),
    updatedAt:new Date(),
  },{
    title:"All Things Start Here",
    deadline:'2020-03-01',
    priority:'low',
    description:'For The Best',
    categoryId:9,
    userId:3,
    createdAt:new Date(),
    updatedAt:new Date(),
  }])
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos',null,{})
  }
};
