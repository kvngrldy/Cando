const { department } = require('../models')

const createRoom = () => {
  let allRooms = [{
    name: 'roomForAll',
    admin: 'admin',
    users: [],
    messages: []
  }]

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
    .catch(console.log)

  return allRooms
}

module.exports = createRoom