const { department } = require('../../models')

const departmentList = [{
  name: 'Business',
  admin: 'admin',
  users: [],
  messages: []
}]


const createRoom = () => {
  let allRooms = []


  // departmentList.forEach(singleDepartment => {
  //   allRooms.push({
  //     name: singleDepartment.name,
  //     admin: 'admin',
  //     users: [],
  //     messages: []
  //   })
  // })



  
  department.findAll()
    .then((data) => {
      data.forEach(singleDepartment => {
        allRooms.push({
          name: singleDepartment.name,
          admin: 'admin',
          users: [],
          messages: []
        })
      });
})
    .catch (console.log)

return allRooms
}

module.exports = createRoom