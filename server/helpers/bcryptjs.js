const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);


function hashPassword(password) {
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function checkPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPassword, checkPassword }