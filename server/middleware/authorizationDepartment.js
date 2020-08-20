const { department_user } = require('../models')


async function authorizationDepartment(req, res, next) {
    let { id, name, email, position } = req.userData
    let departmentId = req.params.id
    try {
        let checkDepartment = await department_user.findOne({ where: { departmentId, userId: id } })
        if (checkDepartment || position === "admin") {
            next()
        }
        else {

            throw { msg: 'Not Authorized in this Department', status: 400 }
        }
    }
    catch (err) {
        next(err)
    }

}


module.exports = authorizationDepartment