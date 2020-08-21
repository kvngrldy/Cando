const { department } = require('../models')

const createRoom = () => {
  let allRooms = []

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